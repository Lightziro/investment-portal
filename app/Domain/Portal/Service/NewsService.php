<?php

namespace App\Domain\Portal\Service;

use App\Http\Classes\StockMarket;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class NewsService
{
    public function getList()
    {
        return Cache::remember('last-news', now()->addHour(), function () {
            $market = new StockMarket();
            return array_slice($market->getMarketNews(), 0, 10);
        });
    }
}
