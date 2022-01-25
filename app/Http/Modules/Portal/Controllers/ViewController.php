<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\User;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class ViewController extends Controller
{
    public function getViewArticle(int $id): JsonResponse
    {
        /** @var Article $article_model */
        $article_model = Article::query()->find($id);
        if (!$article_model) {
            return response()->json(['message' => 'Not found article'], 404);
        }
        $data = $article_model->getView();

        return response()->json($data);
    }

    public function getViewProfile(int $id): JsonResponse
    {
        /** @var User $user */
        $user = User::query()->find($id);
        if (!$user) {
            return response()->json(['message' => 'Not found user'], 404);
        }
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
            foreach ($company_stats->getSeries()['annual']->eps as $eps_year_stats) {
                $ar_eps[] = [
                    'date' => $eps_year_stats->period,
                    'value' => round($eps_year_stats->v, 2),
                ];
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
        for ($i = 1; $i <= 5; $i++) {
            $ar_rating[] = ['score' => $i, 'count' => $idea_model->ratings->where('score', $i)->count()];
        }
        $rating_data = [
            'avg' => $idea_model->ratings->avg('score'),
            'stats' => $ar_rating ?? null
        ];
        $ar_data = [
            'ideaId' => $idea_model->idea_id,
            'epsStats' => $ar_eps ?? [],
            'analyticsStats' => $ar_stats ?? [],
            'comments' => $idea_model->getCommentsFrontend(),
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
                'dateStart' => $idea_model->date_create,
                'dateEnd' => $idea_model->date_end,
            ],
            'description' => $idea_model->description,
            'ratings' => $rating_data
        ];
//        Cache::put("$idea_model->idea_id-$idea_company_model->ticker", $ar_data, now()->addMinutes(3));
        return response()->json($ar_data);
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }
}
