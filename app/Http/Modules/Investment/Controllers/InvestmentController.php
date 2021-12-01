<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\InvestmentIdea;
use App\Models\User;
use Carbon\Carbon;
use Finnhub\Model\BasicFinancials;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;

class InvestmentController extends BaseController
{
    public function getPortalData(): JsonResponse
    {
//        $popular_ideas = InvestmentIdea::query()->getRelatedWithOrderByCount('views', 'user_view_id');
        $max_profit = InvestmentIdea::query()->max('profit');
        $min_profit = InvestmentIdea::query()->min('profit');
        if (!$news = Cache::get("last-news")) {
            $market = new StockMarket();
            $news = $market->getMarketNews();
            Cache::put("last-news", $news, now()->addHour(10));
        }
        $count_success_ideas = InvestmentIdea::query()->where(['status' => InvestmentIdea::STATUS_SUCCESS])->count();
        $count_fail_ideas = InvestmentIdea::query()->where(['status' => InvestmentIdea::STATUS_FAIL])->count();
        $articles = Article::query()->orderByDesc('created_at')->get();
        /** @var Article $article_model */
        foreach ($articles as $article_model) {
            $ar_articles[] = $article_model->getFrontend();
        }

        $investment_ideas = InvestmentIdea::query()->whereNotIn('status', [InvestmentIdea::STATUS_FAIL])
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

        return response()->json([

            'news' => $news,
            'investmentData' => [
                'bestProfit' => $max_profit,
                'worseProfit' => $min_profit,
                'investmentIdeas' => $ar_ideas ?? null,
                'ideaStatistics' => [
                    'success' => $count_success_ideas,
                    'fail' => $count_fail_ideas,
                ]
            ],
            'articles' => $ar_articles ?? []

        ]);
    }
}
