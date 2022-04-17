<?php

namespace App\Http\Modules\PersonalAccount\Controllers;

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
            'comments_count' => $user->commentsArticles()->count() + $user->commentsIdeas()->count(),
            'notices_count' => $user->notices()->count(),
        ]);
    }
}
