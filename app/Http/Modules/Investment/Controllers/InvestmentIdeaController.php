<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaRatings;
use App\Models\User\User;
use Finnhub\Model\BasicFinancials;
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
        // TODO: Переписать проверку на существование идеи в middleware
        $post_data = request()->post();

        /** @var InvestmentIdeaRatings $rating_model */
        $rating_model = $idea->ratings()->create(['score' => $post_data['score'], 'user_id' => request()->user()->user_id]);
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
        if (!$rating_model = InvestmentIdeaRatings::query()->where(['idea_id' => $idea->idea_id, 'user_id' => $user->user_id])->first()) {
            return response()->json([], 204);
        }
        return response()->json(['score' => $rating_model->score, 'created_at' => $rating_model->created_at]);
    }

    public function getComments(InvestmentIdea $idea): JsonResponse
    {
        $comments = $idea->comments()->with('user')->orderByDesc('created_at')->get()->toArray();
        return response()->json($comments);
    }

    public function getRating(InvestmentIdea $idea): JsonResponse
    {
        $ratings = $idea->getRatingStats();
        return response()->json($ratings);
    }

    public function getCompanyStats(InvestmentIdea $idea): JsonResponse
    {
        // TODO: переписать на сервисы
        $market = new StockMarket();
        $ticker = $idea->company->ticker;

        $company_stats = $market->getFinancialsStats($ticker);

        if ($company_stats instanceof BasicFinancials) {
            if (($series = $company_stats->getSeries()['annual']) && !empty($series->eps)) {
                foreach ($series->eps as $eps_year_stats) {
                    $ar_eps[] = [
                        'date' => $eps_year_stats->period,
                        'value' => round($eps_year_stats->v, 2),
                    ];
                }
            }
            if (!empty($ar_eps)) {
                $ar_eps = array_reverse($ar_eps);
            }

        }
        $analytics_stats = $market->getRecommendationAnalytics($ticker);
        if (is_array($analytics_stats)) {
            foreach ($analytics_stats as $stats) {
                $ar_stats[] = [
                    'buy' => $stats['buy'],
                    'period' => $stats['period'],
                    'sell' => $stats['sell'],
                    'hold' => $stats['hold']
                ];
            }
        }
        return response()->json([
            'epsStats' => $ar_eps ?? [],
            'analyticsStats' => $ar_stats ?? []
        ]);
    }
}
