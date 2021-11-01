<?php

namespace App\Http\Controllers;

use App\Http\Classes\StockMarket;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class NewsController extends BaseController
{
    public function getAllNews(): JsonResponse
    {
        $market = new StockMarket();
        $news = $market->getMarketNews();
        $limit = array_slice($news, 0, 9);
        return response()->json($limit ?? []);
    }
}
