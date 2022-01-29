<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaRatings;
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

    public function setRating(Request $request): JsonResponse
    {
        // TODO: Переписать проверку на существование идеи в middleware
        $post_data = $request->post();
        /** @var InvestmentIdea $idea_model */
        if (!$idea_model = InvestmentIdea::query()->find($post_data['ideaId'])) {
            return response()->json(['message' => 'Not found investment idea'], 404);
        }
        $idea_model->ratings()->create(['score' => $post_data['score'], 'user_id' => $request->user()->user_id]);
        return response()->json([]);
    }

    public function getUserRating(Request $request): JsonResponse
    {
        $idea_id = $request->route()->parameters()['id'];
        /** @var User $user */
        if (!$user = $request->user()) {
            return response()->json([], 204);
        }
        /** @var InvestmentIdeaRatings $rating_model */
        if(!$rating_model = InvestmentIdeaRatings::query()->where(['idea_id' => $idea_id, 'user_id' => $user->user_id])->first()) {
            return response()->json([], 204);
        }
        return response()->json(['score' => $rating_model->score, 'created_at' => $rating_model->created_at]);
    }
}
