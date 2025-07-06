<?php

namespace App\Console\Commands;

use App\Domain\Portal\Service\QuoteService;
use App\Enums\BalanceUp;
use App\Enums\CommissionAmount;
use App\Models\User\UserPrediction;
use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PredictionCommission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:predict-commission';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(private readonly QuoteService $service)
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        Log::channel('commands')->info('Start prediction commission', [now()->toString()]);
        $cutoffDate = today('Europe/Moscow')->subDays(2)->startOfDay();
        /** @var UserPrediction[]|Collection $predictions */
        $predictions = UserPrediction::query()->with(['user', 'company'])
            ->whereNull('end_at')
            ->where(DB::raw('DATE(created_at)'), '<=', $cutoffDate)
            ->get();
        Log::channel('commands')->info('Query info predictions', [$predictions->count()]);
        foreach ($predictions as $predict) {
            $user = $predict->user;
            if ($user->balance < CommissionAmount::COMMISSION_DEAL_AMOUNT->value) {
                Log::channel('commands')->info("User{$user->getKey()} balance not enough", [$user->balance]);
                $predict->end_at = now();
                $infoQuote = $this->service->getQuoteInfo($predict->company);
                $changePercent = QuoteService::calculatePercentageChange($predict->price, $infoQuote->getLastPrice());
                $profit = $predict->amount * $changePercent;
                $addBalance = $profit + $predict->amount;
                $closeTransfer = $user->balanceTransfers()->create([
                   'event' => BalanceUp::DEAL_CLOSE,
                   'amount' => $addBalance
                ]);
                $predict->close_transfer_id = $closeTransfer->getKey();
                $predict->profit_amount = $profit;
                $user->balance += $addBalance;
                $user->save();
                $user->notices()->create([
                    'viewed' => false,
                    'title' => 'Ваша позиция принудительно',
                    'description' => 'Не удалось списать средства за удержание позиции, поэтому закрыли сделку принудительно'
                ]);
                $user->balance -= CommissionAmount::COMMISSION_DEAL_AMOUNT->value;
                $user->balanceTransfers()->create([
                    'event' => BalanceUp::COMMISSION_RETENTION,
                    'amount' => -CommissionAmount::COMMISSION_DEAL_AMOUNT->value,
                ]);
                $user->save();
                $predict->save();
                continue;
            }
            Log::channel('commands')->info("User{$user->getKey()} commission transfer", [$predict->getKey()]);
            $user->balance -= CommissionAmount::COMMISSION_DEAL_AMOUNT->value;
            $user->balanceTransfers()->create([
                'event' => BalanceUp::COMMISSION_RETENTION,
                'amount' => -CommissionAmount::COMMISSION_DEAL_AMOUNT->value,
            ]);
            $user->save();
        }
        $noticeTimeCheck = today('Europe/Moscow')->subDays(1)->startOfDay();
        /** @var UserPrediction[] $notifyPredict */
        $notifyPredict = UserPrediction::query()->with(['user'])
            ->whereNull('end_at')
            ->where(DB::raw('DATE(created_at)'), '<=', $noticeTimeCheck)
            ->get();
        foreach ($notifyPredict as $predict) {
            $user = $predict->user;
            if ($user->balance < CommissionAmount::COMMISSION_DEAL_AMOUNT->value) {
                Log::channel('commands')->info("User{$user->getKey()} notify", [$user->balance]);
                $user->notices()->create([
                    'viewed' => false,
                    'title' => 'Tomorrow the transaction holding fee will be charged',
                    'description' => 'Top up your balance or the deal will be closed automatically',
                ]);
            }
        }
        Log::channel('commands')->info('End prediction commission');
        return 1;
    }
}
