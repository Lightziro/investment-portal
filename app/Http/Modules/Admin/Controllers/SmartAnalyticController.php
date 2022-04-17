<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\StockMarket;
use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class SmartAnalyticController extends Controller
{
    public function getAnalyticData(): JsonResponse
    {
        $client = new Client();
        $response = $client->get('http://host.docker.internal:5000/classification/get/score');
        $content = json_decode($response->getBody(), true);
        return response()->json([
            'score' => [
                'classificationNews' => round($content['score'], 2)
            ]
        ]);
    }

    public function getNewsForAnalyze(): JsonResponse
    {
        $market = new StockMarket();
        $news = $market->getMarketNews();
        $analyze_news = [];
        foreach ($news as $item_news) {
            $analyze_news[] = [
                'id' => $item_news['id'],
                'title' => $item_news['headline'],
                'prediction' => '',
            ];
        }
        return response()->json($analyze_news);
    }
}
