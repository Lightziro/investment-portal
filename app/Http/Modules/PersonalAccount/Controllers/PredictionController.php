<?php

namespace App\Http\Modules\PersonalAccount\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\User\User;
use App\Models\User\UserPredictions;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as RequestHelper;
use Throwable;

class PredictionController extends Controller
{
    public function getList(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $market = new StockMarket();

        $predictions = $user->predictions()->with('company')->get();
        /** @var UserPredictions $predict */
        foreach ($predictions as $predict) {
            $company = $predict->company;
            $quote_info = $market->getLastQuote($company->ticker);
            $ar_predict[] = array_merge($predict->toArray(), [
                'current_price' => $quote_info->getC()
            ]);
        }
        return response()->json($ar_predict ?? []);
    }

    public function deletePredict(UserPredictions $predict): JsonResponse
    {
        try {
            /** @var User $user */
            $user = RequestHelper::user();
            if ($user->user_id !== $predict->user_id) {
                return response()->json([], 404);
            }
            $predict->delete();
            return response()->json([]);
        } catch (Throwable $e) {
            return response()->json([], 400);
        }
    }

    public function create(Request $request): JsonResponse
    {
        try {
            /** @var User $user */
            $user = $request->user();

            if ($user->predictions()->firstWhere('company_id', $request->get('company_id'))) {
                return response()->json([], 405);
            }

            $user->predictions()->create($request->only(['company_id', 'predict_price']));
            return response()->json([]);
        } catch (Throwable $e) {
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
}
