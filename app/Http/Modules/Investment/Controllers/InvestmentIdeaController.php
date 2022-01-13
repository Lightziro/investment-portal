<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaStatuses;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class InvestmentIdeaController extends Controller
{
    public function createComment(Request $request): JsonResponse
    {
        $commentData = $request->post();
        $user_id = $commentData['userId'];
        if (!isset($commentData['ideaId'], $commentData['text']) || !is_numeric($request->post()['ideaId'])) {
            return response()->json(['message' => 'No correct request data'], 400);
        }
        $comment = new InvestmentIdeaComments();
        $comment->comment = $commentData['text'];
        $comment->user_id = $user_id;
        $comment->idea_id = $commentData['ideaId'];
        $comment->save();
        return response()->json($comment->getFrontendComment());
    }
}
