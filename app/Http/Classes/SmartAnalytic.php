<?php

namespace App\Http\Classes;

use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;

class SmartAnalytic
{
    private Client $client;
    private const URL = 'http://host.docker.internal:5000';

    public function __construct()
    {
        $this->client = new Client();
    }
    public function classificationNews(array $ar_news)
    {
        $response = $this->client->post(self::URL."/classification-news", [RequestOptions::JSON => $ar_news]);
        return json_decode($response->getBody()->getContents(), true);
    }
}
