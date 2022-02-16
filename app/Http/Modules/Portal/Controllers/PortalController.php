<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Http\Classes\StockMarket;
use App\Http\Modules\Article\Helpers\ArticleHelper;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\Other\Company;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cache;

class PortalController extends BaseController
{
    public function getPortalData(): JsonResponse
    {
        $count_success_ideas = InvestmentIdea::query()->with('status', fn($query) => $query->where(['name' => InvestmentIdeaStatuses::STATUS_PUBLISHED]))->count();
        $count_fail_ideas = InvestmentIdea::query()->with('status', fn($query) => $query->where(['name' => InvestmentIdeaStatuses::STATUS_FAILED]))->count();

        $articles_popular = Article::mostPopular()->limit(3)->with('author')->get()->toArray();
        $articles_popular = ArticleHelper::filterDeletedAuthors($articles_popular);
        $pk_list = array_column($articles_popular, 'article_id');

        $articles_simple = Article::query()->whereNotIn('article_id', $pk_list)
            ->orderByDesc('created_at')
            ->limit(10)->with('author')->get()->toArray();
        $articles_simple = ArticleHelper::filterDeletedAuthors($articles_simple);

        $investment_ideas = InvestmentIdea::mostPopular()->limit(5)->get();
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
            'stats' => [
                'success' => $count_success_ideas,
                'fail' => $count_fail_ideas,
            ],
            'ideas' => $ar_ideas ?? [],
            'articles' => [
                'popular' => $articles_popular ?? null,
                'simple' => $articles_simple ?? null
            ]
        ]);
    }

    public function getNews(): JsonResponse
    {
        if (!$news = Cache::get("last-news")) {
            $market = new StockMarket();
            $news = array_slice($market->getMarketNews(), 0, 10);
            Cache::put("last-news", $news, now()->addHour());
        }
        return response()->json($news ?? []);
    }

    public function searchData(string $search): JsonResponse
    {
        $companies = Company::query()->where('name', 'LIKE', "%{$search}%");
        if ($companies->count()) {
            $ar_search[] = ['label' => 'Companies', 'items' => $companies->limit(5)->get(['name'])->toArray()];
        }

        $profiles = User::query()->where('first_name', 'LIKE', "%{$search}%")
            ->orWhere('last_name', 'LIKE', "%{$search}%");
        if ($profiles->count()) {
            $ar_search[] = ['label' => 'Profiles', 'items' => $profiles->limit(5)->get(['first_name', 'last_name'])->toArray()];
        }
        return response()->json($ar_search ?? []);
    }
}
