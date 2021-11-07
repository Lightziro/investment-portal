<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
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

    public function getData(): RedirectResponse|Application|JsonResponse|Redirector
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return redirect('/');
        }
        /** @var User $user */
        $user = User::query()->where('remember_token', $cookie['token'])->first();
        $ar_data = [
            'viewToday' => 0,
            'likedToday' => 0,
        ];
        $investment_ideas = $user->investment_ideas;
        foreach ($investment_ideas as $idea_model) {
            $ar_data['viewToday'] += $idea_model->views()->whereDate('date_view', Carbon::today())->count();
            $ar_data['likedToday'] += $idea_model->reaction()->where('reaction', '=', 'Liked')->count();

        }
        return response()->json($ar_data);
    }

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

        $investment_ideas = InvestmentIdea::query()->whereNotIn('status', [InvestmentIdea::STATUS_FAIL])
            ->orderBy('possible_profit')->limit(5)->get();


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
            ]

        ]);
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }

    public function getInvestmentIdeaData(int $id): JsonResponse
    {
        /** @var InvestmentIdea $idea_model */
        $idea_model = InvestmentIdea::query()->find($id);
        $market = new StockMarket();
        $idea_company_model = $idea_model->company;
        if ($ar_data = $this->getCacheIdeaData($idea_model->idea_id, $idea_company_model->ticker)) {
            return response()->json($ar_data);
        }

        $quote_info = $market->getLastQuote($idea_company_model->ticker);
        $author_model = $idea_model->author;
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
        $ar_data = [
            'epsStats' => $ar_eps ?? [],
            'analyticsStats' => $ar_stats ?? [],
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
            'authorInfo' => [
                'totalIdeas' => $author_model->investment_ideas->count(),
                'amountSuccessfulIdeas' => $author_model->investment_ideas->where('status', InvestmentIdea::STATUS_SUCCESS)->count(),
                'amountFailIdeas' => $author_model->investment_ideas->where('status', InvestmentIdea::STATUS_FAIL)->count(),
                'fullName' => $author_model->getFullName(),
            ],
            'ideaInfo' => [
                'isShort' => $idea_model->is_short,
                'priceBuy' => $idea_model->price_buy,
                'priceSell' => $idea_model->price_sell,
                'dateStart' => $idea_model->date_create,
                'dateEnd' => $idea_model->date_end,
            ],
            'description' => $idea_model->description
        ];
        Cache::put("$idea_model->idea_id-$idea_company_model->ticker", $ar_data, now()->addMinutes(3));
        return response()->json($ar_data);
    }
}
