<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cache;

class InvestmentController extends BaseController
{
    public function getPortalData(): JsonResponse
    {

    }

    public function getNews(): JsonResponse
    {
        if (!$news = Cache::get("last-news")) {
            $market = new StockMarket();
            $news = array_slice($market->getMarketNews(), 0, 10);
            Cache::put("last-news", $news, now()->addHour(1));
        }
        return response()->json($news ?? []);
    }
}
