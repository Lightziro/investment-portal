<?php

namespace App\Http\Modules\PersonalAccount\Controllers;

use App\Enums\BalanceUp;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;

class MainStatsController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        return response()->json([
            'upBalance' => $user->balanceTransfers()->where('event', BalanceUp::UP_PAYMENT)->sum('amount'),
            'profit' => $user->predictions()->whereNotNull('end_at')->sum('profit_amount'),
        ]);
    }
}
