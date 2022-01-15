<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\User;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class InvestmentIdeaController extends Controller
{
    public function createComment(Request $request): JsonResponse
    {
        $post_data = $request->post();
        /** @var User $user */
        if (!$user = $request->user()) {
            return response()->json(['Not found user'], 404);
        }
        /** @var InvestmentIdea $idea_model */
        $idea_model = InvestmentIdea::query()->find($post_data['entityId']);
        if (!$idea_model) {
            return response()->json(['message' => 'Not found investment idea'], 404);
        }
        $comment = new InvestmentIdeaComments();
        $comment->comment = $post_data['comment'];
        $comment->user_id = $user->user_id;
        $comment->idea_id = $idea_model->idea_id;
        $comment->save();
        return response()->json($comment->getFrontendComment());
    }
}
