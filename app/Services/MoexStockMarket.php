<?php

namespace App\Services;

use Exception;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class MoexStockMarket
{
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://iss.moex.com/iss/engines/stock/markets/shares/boards/TQBR/securities/GAZP.json',
//            'headers' => [
//                'Accept' => 'application/json',
//                'Content-Type' => 'application/json',
//            ],
        ]);
    }

    public function getLastQuote(string $ticker)
    {
        try {
            $arData = $this->client->get('');
            $data = json_decode($arData->getBody(), true);
            if (isset($data['securities']['data'][0])) {
                $security_data = $data['securities']['data'][0];
                $columns = $data['securities']['columns'];

                // Создаем ассоциативный массив для удобства
                $stock_info = array_combine($columns, $security_data);
                // Получаем текущую цену
                $current_price = $stock_info['PREVPRICE']; // Цена предыдущего дня
                $last_price = $stock_info['PREVLEGALCLOSEPRICE']; // Последняя цена (если есть торги)

                // Вычисляем изменение в процентах
                if ($current_price > 0) {
                    $price_change_percent = (($last_price - $current_price) / $current_price) * 100;
                }

                echo "Текущая цена SBER: " . $last_price . " руб.\n";
                echo "Изменение за день: " . round($price_change_percent, 2) . "%\n";
            }
        } catch (Exception $e) {
            Log::error('ex', [$e]);
            return null;
        }
    }
}
