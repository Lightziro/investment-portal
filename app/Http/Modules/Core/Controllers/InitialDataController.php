<?php


namespace App\Http\Modules\Core\Controllers;


use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class InitialDataController extends Controller
{
    public function getPortalInit(): JsonResponse
    {
        //        $popular_ideas = InvestmentIdea::query()->getRelatedWithOrderByCount('views', 'user_view_id');
        $max_profit = InvestmentIdea::query()->max('profit');
        $min_profit = InvestmentIdea::query()->min('profit');

        $count_success_ideas = InvestmentIdea::query()->with('status', fn($query) => $query->where(['name' => InvestmentIdeaStatuses::STATUS_PUBLISHED]))->count();
        $count_fail_ideas = InvestmentIdea::query()->with('status', fn($query) => $query->where(['name' => InvestmentIdeaStatuses::STATUS_FAILED]))->count();
        $popular_articles = Article::mostPopular()->limit(3)->get();
        $pk_list = [];
        /** @var Article $article_model */
        foreach ($popular_articles as $article_model) {
            $pk_list[] = $article_model->article_id;
            $articles_popular[] = $article_model->getFrontend();
        }
        $articles = Article::query()->whereNotIn('article_id', $pk_list)
            ->orderByDesc('created_at')
            ->limit(10)->get();
        foreach ($articles as $article_model) {
            $articles_simple[] = $article_model->getFrontend();
        }
        $investment_ideas = InvestmentIdea::query()
            ->with('status', callback: fn($query) => $query->whereNotIn('name', [InvestmentIdeaStatuses::STATUS_FAILED]))
            ->orderBy('possible_profit', 'DESC')->limit(5)->get();


        /** @var InvestmentIdea $idea_model */
        foreach ($investment_ideas as $idea_model) {
            $company_info = $idea_model->company;
            $ar_ideas[] = [
                'id' => $idea_model->idea_id,
                'possibleProfit' => $idea_model->possible_profit,
                'stock' => $company_info->name,
                'logo' => $company_info->logo,
            ];
        }
        /** @var User|null $user */
        if ($user = Auth::user()) {
            $user = $user->getFrontendData();
        }
        return response()->json([
            'main' => [
                'investmentData' => [
                    'bestProfit' => $max_profit,
                    'worseProfit' => $min_profit,
                    'investmentIdeas' => $ar_ideas ?? null,
                    'ideaStatistics' => [
                        'success' => $count_success_ideas,
                        'fail' => $count_fail_ideas,
                    ]
                ],
                'articles' => [
                    'popular' => $articles_popular ?? null,
                    'simple' => $articles_simple ?? null
                ]
            ],
            'user' => $user
        ]);
    }
}
