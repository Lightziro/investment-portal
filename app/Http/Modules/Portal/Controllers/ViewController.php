<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Article\ArticleComments;
use App\Models\Investment\InvestmentIdea;
use App\Models\User\User;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Throwable;

class ViewController extends Controller
{
    public function getViewArticle(int $id): JsonResponse
    {
        try {
            /** @var Article $article_model */
            $article_model = Article::query()->with('author')->findOrFail($id);

            $comments = $article_model->comments()->orderByDesc('created_at')->get()->toArray();

            $ar_data = array_merge($article_model->toArray(), [
                'comments' => $comments ?? [],
                'labels' => $article_model->getLabels()
            ]);

            return response()->json($ar_data);
        } catch (Throwable $e) {
            return response()->json([], 404);
        }
    }

    public function getViewProfile(User $user): JsonResponse
    {
        return response()->json($user->getProfile());
    }

    public function getViewIdea(int $id): JsonResponse
    {
        /** @var InvestmentIdea $idea_model */
        $idea_model = InvestmentIdea::query()->find($id);
        if (!$idea_model) {
            return response()->json(['message' => 'Not found idea'], 404);
        }
        $market = new StockMarket();
        $idea_company_model = $idea_model->company;
        if ($ar_data = $this->getCacheIdeaData($idea_model->idea_id, $idea_company_model->ticker)) {
            return response()->json($ar_data);
        }

        $quote_info = $market->getLastQuote($idea_company_model->ticker);
        $company_stats = $market->getFinancialsStats($idea_company_model->ticker);

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
        $analytics_stats = $market->getRecommendationAnalytics($idea_company_model->ticker);
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

        $ar_data = [
            'ideaId' => $idea_model->idea_id,
            'epsStats' => $ar_eps ?? [],
            'analyticsStats' => $ar_stats ?? [],
            'comments' => $idea_model->comments()->with('user')->get()->toArray(),
            'companyInfo' => [
                'companyName' => $idea_company_model->name,
                'ticker' => $idea_company_model->ticker,
                'logoPath' => $idea_company_model->logo,
                'dateIPO' => $idea_company_model->date_ipo,
                'industry' => $idea_company_model->industry_work,
                'lastQuote' => $quote_info->getC() ?? null,
                'percentChangeToday' => $quote_info->getDp() ?? null,
                'changeToday' => $quote_info->getD(),
            ],
            'authorInfo' => $idea_model->getFrontendAuthor(),
            'ideaInfo' => [
                'isShort' => $idea_model->is_short,
                'priceBuy' => $idea_model->price_buy,
                'priceSell' => $idea_model->price_sell,
                'dateStart' => $idea_model->created_at,
                'dateEnd' => $idea_model->date_end,
            ],
            'description' => $idea_model->description,
            'ratings' => $idea_model->getRatingStats()
        ];
//        Cache::put("$idea_model->idea_id-$idea_company_model->ticker", $ar_data, now()->addMinutes(3));
        return response()->json($ar_data);
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }
}
