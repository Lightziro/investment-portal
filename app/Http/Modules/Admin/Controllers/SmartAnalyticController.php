<?php

namespace App\Http\Modules\Admin\Controllers;

use GuzzleHttp\Client;
use Illuminate\Routing\Controller;

class SmartAnalyticController extends Controller
{
    public function getAnalyticData()
    {
        $result = '';
        $client = new Client();
        $response = $client->get('http://host.docker.internal:5000/news/predict');
        $score = json_decode($response->getBody(), true);
    }
}
