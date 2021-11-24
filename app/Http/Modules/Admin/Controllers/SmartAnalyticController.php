<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\StockMarket;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SmartAnalyticController extends Controller
{
    public function getAnalyticData(): JsonResponse
    {
        $client = new Client();
        $response = $client->get('http://host.docker.internal:5000/classification/test-score');
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

    public function trainNewsClassifier(Request $request)
    {
        $predict_data = $request->post();
        if (!is_array($predict_data)) {
            return response()->json(['message' => 'Error receiving data'], 400);
        }
        $ar_news = [];
        foreach ($predict_data as $item) {
            if ($item['prediction']) {
                $ar_news[] = [
                    'title' => $item['title'],
                    'score' => $item['prediction']
                ];
            }
        }
        if (empty($ar_news)) {
            return response()->json(['message' => 'Please set predict at least one news'], 400);
        }
        $client = new Client();
        $response = $client->post('http://host.docker.internal:5000/classification/train', [RequestOptions::JSON => $ar_news]);
        $result_retrain = json_decode($response->getBody()->getContents(), true);
        $before_score = round($result_retrain['before'], 4);
        $after_score = round($result_retrain['after'], 4);
        if ($after_score > $before_score && $result_retrain['result']) {
            return response()->json(['message' => "Success retrain, score upped with $before_score to $after_score", 'newScore' => round($after_score, 2)]);
        }
        return response()->json(['message' => 'Failed to retrain the classifier, new results reduce score']);
    }
}
