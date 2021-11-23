<?php

namespace App\Http\Modules\Admin\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;
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
}
