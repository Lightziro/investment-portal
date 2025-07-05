<?php

namespace App\Services;

use Carbon\Carbon;
use DateTime;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;

class TinkoffStockMarket {
    private $token;
    private $baseUrl = 'https://invest-public-api.tinkoff.ru/rest/';

    public function __construct() {
        $config = config('services.tinkoff');
        $this->token = config('services.tinkoff.token');
        $this->client = new Client([
            'base_uri' => "https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/",
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $this->token,
            ],
        ]);
    }

//    private function makeRequest($endpoint, $data = []) {
//        $url = $this->baseUrl . $endpoint;
//
//        $headers = [
//            'Authorization: Bearer ' . $this->token,
//            'Content-Type: application/json'
//        ];
//
//        $ch = curl_init();
//        curl_setopt($ch, CURLOPT_URL, $url);
//        curl_setopt($ch, CURLOPT_POST, true);
//        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
//        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//
//        $response = curl_exec($ch);
//        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
//        curl_close($ch);
//
//        if ($httpCode !== 200) {
//            throw new Exception("HTTP Error: $httpCode");
//        }
//
//        return json_decode($response, true);
//    }

    // Получение текущей цены
    public function getCurrentPrice($figi) {
        $data = ['figi' => [$figi]];
        $response = $this->client->post('GetLastPrices', [
            RequestOptions::JSON => $data
        ]);
        $dataResponse = json_decode($response->getBody(), true);

        if (!data_get($dataResponse, 'lastPrices.0')) {
            throw new Exception("Цена не найдена");
        }

        $price = data_get($dataResponse, 'lastPrices.0.price');
        return $this->convertPrice($price);
    }

    // Получение дневной свечи для расчета изменения
    public function getDayCandle($figi) {
        $now = new DateTime();
        $yesterday = new DateTime('-2 days'); // Берем 2 дня назад для гарантии

        $data = [
            'figi' => $figi,
            'from' => Carbon::now()->format('c'),
            'to' => Carbon::now()->format('c'),
            'interval' => 'CANDLE_INTERVAL_DAY'
        ];
        $response = $this->client->post('GetCandles', [
            RequestOptions::JSON => $data,
        ]);
        $dataResponse = json_decode($response->getBody(), true);

        if (empty($dataResponse['candles'])) {
            throw new Exception("Исторические данные не найдены");
        }

        // Берем последнюю свечу (вчерашнюю или позавчерашнюю)
        $candles = $dataResponse['candles'];
        $lastCandle = end($candles);

        return [
            'open' => $this->convertPrice($lastCandle['open']),
            'close' => $this->convertPrice($lastCandle['close']),
            'high' => $this->convertPrice($lastCandle['high']),
            'low' => $this->convertPrice($lastCandle['low'])
        ];
    }

    private function convertPrice($priceObj) {
        $units = isset($priceObj['units']) ? (int)$priceObj['units'] : 0;
        $nano = isset($priceObj['nano']) ? (int)$priceObj['nano'] : 0;

        return $units + ($nano / 1000000000);
    }

    public function getStockInfo($figi) {
        try {
            $currentPrice = $this->getCurrentPrice($figi);
            $dayCandle = $this->getDayCandle($figi);

            $yesterdayClose = $dayCandle['open'];
            $changeAbsolute = $currentPrice - $yesterdayClose;
            $changePercent = ($changeAbsolute / $yesterdayClose) * 100;

            return [
                'current_price' => round($currentPrice, 2),
                'yesterday_close' => round($yesterdayClose, 2),
                'change_absolute' => round($changeAbsolute, 2),
                'change_percent' => round($changePercent, 2),
                'day_high' => round($dayCandle['high'], 2),
                'day_low' => round($dayCandle['low'], 2)
            ];

        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
