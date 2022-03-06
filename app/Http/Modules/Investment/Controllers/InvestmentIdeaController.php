<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Modules\Investment\Helpers\InvestmentIdeaHelper;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaRatings;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

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
        return response()->json(array_merge($comment->toArray(), [
            'user' => $comment->user->toArray()
        ]));
    }

    public function setRating(InvestmentIdea $idea): JsonResponse
    {
        $post_data = request()->post();

        /** @var InvestmentIdeaRatings $rating_model */
        $rating_model = $idea->ratings()->create([
            'score' => $post_data['score'],
            'user_id' => request()->user()->user_id
        ]);
        return response()->json([
            'ratings' => $idea->getRatingStats(),
            'userRating' => ['score' => $rating_model->score, 'created_at' => $rating_model->created_at]
        ]);
    }

    public function getUserRating(InvestmentIdea $idea): JsonResponse
    {
        /** @var User $user */
        if (!$user = request()->user()) {
            return response()->json([], 204);
        }
        /** @var InvestmentIdeaRatings $rating_model */
        if (!$rating_model = InvestmentIdeaRatings::query()->where([
            'idea_id' => $idea->idea_id,
            'user_id' => $user->user_id
        ])->first()) {
            return response()->json([], 204);
        }
        return response()->json(['score' => $rating_model->score, 'created_at' => $rating_model->created_at]);
    }

    public function getComments(InvestmentIdea $idea): JsonResponse
    {
        $comments = $idea->comments()->with('user')->orderByDesc('created_at')->get()->toArray();
        return response()->json(InvestmentIdeaHelper::filterDeletedUser($comments));
    }

    public function getRating(InvestmentIdea $idea): JsonResponse
    {
        $ratings = $idea->getRatingStats();
        return response()->json($ratings);
    }

    public function all(string $sort_by = 'idea_id'): JsonResponse
    {
        $query_ideas = InvestmentIdea::query();

        switch ($sort_by) {
            case 'company__name':
                $query_ideas->select('investment_ideas.*')
                    ->join('companies', 'companies.company_id', '=', 'investment_ideas.company_id')
                    ->orderBy('companies.name');
                break;
            default:
                $direction = 'asc';
                if (str_contains($sort_by, '__')) {
                    [$sort_by, $direction] = explode('__', $sort_by);
                }
                $query_ideas->orderBy($sort_by, $direction);
        }
        return response()->json(InvestmentIdeaHelper::filterDeletedUser($query_ideas->get()->toArray()));
    }
}
