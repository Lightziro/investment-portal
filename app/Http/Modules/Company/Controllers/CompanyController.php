<?php

namespace App\Http\Modules\Company\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Other\Company;
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
}
