<?php

namespace App\Http\Modules\Company\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Other\Company;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class CompanyController extends Controller
{
    public function getQuote(Company $company): JsonResponse
    {
        $market = new StockMarket();

        $quote_stats = $market->getLastQuote($company->ticker);
        if ($quote_stats) {
            return response()->json([
                'value_change' => $quote_stats->getD(),
                'value_change_percent' => $quote_stats->getDp(),
                'value_last' => $quote_stats->getL(),
            ]);
        }
        return response()->json([], 404);
    }

    public function getStats(Company $company): JsonResponse
    {
        // TODO: переписать на сервисы
        $market = new StockMarket();

        $company_stats = $market->getFinancialsStats($company->ticker);

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
        $analytics_stats = $market->getRecommendationAnalytics($company->ticker);
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
