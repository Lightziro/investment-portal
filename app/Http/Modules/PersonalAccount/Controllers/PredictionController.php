<?php

namespace App\Http\Modules\PersonalAccount\Controllers;

use App\Domain\Portal\Service\QuoteService;
use App\Enums\BalanceUp;
use App\Enums\CommissionAmount;
use App\Enums\TypeMarketParse;
use App\Http\Classes\StockMarket;
use App\Http\Requests\PredictionCreateRequest;
use App\Models\User\User;
use App\Models\User\UserPrediction;
use App\Models\User\UserPredictions;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request as RequestHelper;
use Throwable;

class PredictionController extends Controller
{
    public function getList(Request $request, QuoteService $service): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $market = new StockMarket();

        $predictions = $user->predictions()->whereNull('end_at')->with('company')->get();
        /** @var UserPrediction $predict */
        foreach ($predictions as $predict) {
            $company = $predict->company()->first();
            $quoteInfo = $service->getQuoteInfo($company);
            if (!$quoteInfo) {
                continue;
            }
            $ar_predict[] = array_merge($predict->toArray(), [
                'current_price' => $quoteInfo->getLastPrice(),
            ]);
        }
        return response()->json($ar_predict ?? []);
    }

    public function create(PredictionCreateRequest $request): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $request->user();

            if ($user->predictions()->whereNull('end_at')->firstWhere('company_id', $request->get('company_id'))) {
                return response()->json([], 405);
            }

            $transferCommission = $user->balanceTransfers()->create([
                'event' => BalanceUp::COMMISSION_DEAL,
                'amount' => -CommissionAmount::COMMISSION_DEAL_AMOUNT->value,
            ]);

            $transferDeal = $user->balanceTransfers()->create([
                'event' => BalanceUp::DEAL,
                'amount' => $request->integer('amount') * -1,
            ]);

            $prediction = $user->predictions()->create([
                'is_top' => $request->boolean('is_top'),
                'amount' => $request->integer('amount'),
                'price' => $request->float('price'),
                'company_id' => $request->integer('company_id'),
                'transfer_id' => $transferDeal->getKey(),
            ]);
            $user->balance -= ($request->integer('amount') + CommissionAmount::COMMISSION_DEAL_AMOUNT->value);
            $user->save();

            return response()->json($prediction->toArray());
        } catch (Throwable $e) {
            Log::error('exception', [$e]);
            return response()->json([], 400);
        }
    }

    public function updatePredict(UserPredictions $predict, Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        if ($predict->user_id !== $user->getKey()) {
            return response()->json([], 403);
        }

        $predict->update($request->post());
        return response()->json([]);
    }

    public function closePredict(UserPrediction $predict, Request $request)
    {
        try {
            Log::error('debug', [$predict]);
            /** @var User $user */
            $user = $request->user();
            $profit = $request->integer('profit') + $predict->amount;

            $transferCommission = $user->balanceTransfers()->create([
                'event' => BalanceUp::COMMISSION_DEAL,
                'amount' => - CommissionAmount::COMMISSION_DEAL_AMOUNT->value,
            ]);

            $transferDeal = $user->balanceTransfers()->create([
                'event' => BalanceUp::DEAL_CLOSE,
                'amount' => $profit,
            ]);
            $predict->close_transfer_id = $transferDeal->getKey();
            $predict->profit_amount = $request->integer('profit');

            $predict->end_at = now();
            $predict->save();

            $user->balance -=  CommissionAmount::COMMISSION_DEAL_AMOUNT->value;
            $user->balance += $profit;
            $user->save();

            return response()->json([]);
        } catch (Throwable $e) {
            Log::error('exception', [$e]);
            return response()->json([], 400);
        }
    }
}
