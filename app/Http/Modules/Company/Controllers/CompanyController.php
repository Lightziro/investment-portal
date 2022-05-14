<?php

namespace App\Http\Modules\Company\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
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

        if ($company_stats) {
            if (($series = $company_stats->getSeries()['annual']) && !empty($series->eps)) {
                foreach ($series->eps as $eps_year_stats) {
                    $ar_eps[] = [
                        'date' => $eps_year_stats->period,
                        'value' => round($eps_year_stats->v, 2),
                    ];
                }
                foreach ($series->netMargin as $margin_stat) {
                    $ar_net_margin[] = [
                        'date' => $margin_stat->period,
                        'value' => round($margin_stat->v, 2),
                    ];
                }
                foreach ($series->salesPerShare as $sale_stat) {
                    $ar_sale[] = [
                        'date' => $sale_stat->period,
                        'value' => round($sale_stat->v, 2),
                    ];
                }
            }
            $ar_eps = array_reverse($ar_eps ?? []);
            $ar_net_margin = array_reverse($ar_net_margin ?? []);
            $ar_sale = array_reverse($ar_sale ?? []);

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
            'analyticsStats' => $ar_stats ?? [],
            'netMarginStats' => $ar_net_margin ?? [],
            'salePerShare' => $ar_sale ?? []
        ]);
    }
}
