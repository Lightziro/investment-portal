<?php

namespace App\Http\Modules\Company\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;

class CompanyController extends Controller
{
    public function getQuote(Company $company): JsonResponse
    {
        $market = new StockMarket();

        $quote_stats = $market->getLastQuote($company->ticker);
        if ($quote_stats) {
            return response()->json([
                'value_change' => data_get($quote_stats, 'd'),
                'value_change_percent' => data_get($quote_stats, 'dp'),
                'value_last' => data_get($quote_stats, 'l'),
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
            if (($series = data_get($company_stats, 'series.annual'))) {
                foreach (data_get($series, 'eps', []) as $eps_year_stats) {
                    $ar_eps[] = [
                        'date' => data_get($eps_year_stats, 'period'),
                        'value' => round(data_get($eps_year_stats, 'v'), 2),
                    ];
                }
                foreach (data_get($series, 'netMargin', []) as $margin_stat) {
                    $ar_net_margin[] = [
                        'date' => data_get($margin_stat, 'period'),
                        'value' => round(data_get($margin_stat, 'v'), 2),
                    ];
                }
                foreach (data_get($series, 'salesPerShare', []) as $sale_stat) {
                    $ar_sale[] = [
                        'date' => data_get($sale_stat, 'period'),
                        'value' => round(data_get($sale_stat, 'v'), 2),
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
