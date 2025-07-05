<?php

namespace App\Console\Commands;

use App\Domain\Portal\Service\QuoteService;
use App\Enums\BalanceUp;
use App\Enums\CommissionAmount;
use App\Exceptions\ConsumerException;
use App\Http\Classes\QueueRabbit;
use App\Http\Classes\StockMarket;
use App\Http\Modules\Admin\Helpers\AnalyticsHelper;
use App\Models\Investment\AnalyticalQuestion;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaAnalyze;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\UserPrediction;
use App\Services\MoexStockMarket;
use App\Services\TinkoffAPI;
use App\Services\TinkoffStockMarket;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Message\AMQPMessage;
use Throwable;

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
        $cutoffDate = today('Europe/Moscow')->subDays(2)->startOfDay();
        /** @var UserPrediction[] $predictions */
        $predictions = UserPrediction::query()->with(['user', 'company'])
            ->whereNull('end_at')
            ->where(DB::raw('DATE(created_at)'), '<=', $cutoffDate)
            ->get();
        foreach ($predictions as $predict) {
            $user = $predict->user;
            if ($user->balance < CommissionAmount::COMMISSION_DEAL_AMOUNT->value) {
                $predict->end_at = now();
                $infoQuote = $this->service->getQuoteInfo($predict->company);
                $changePercent = QuoteService::calculatePercentageChange($predict->price, $infoQuote->getLastPrice());
                $addBalance = $predict->amount * $changePercent;
                $user->balanceTransfers()->create([
                   'event' => BalanceUp::DEAL_CLOSE,
                   'amount' => $addBalance
                ]);
                $user->balance += $addBalance;
                $user->save();
                $user->notices()->create([
                    'viewed' => false,
                    'title' => 'Deal force close',
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
                $user->notices()->create([
                    'viewed' => false,
                    'title' => 'Tomorrow the transaction holding fee will be charged',
                    'description' => 'Top up your balance or the deal will be closed automatically',
                ]);
            }
        }

        return 1;
    }
}
