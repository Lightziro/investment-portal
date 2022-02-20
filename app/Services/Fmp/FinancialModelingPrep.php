<?php

namespace App\Services\Fmp;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use JsonException;

class FinancialModelingPrep
{
    private Client $client;
    private string $base_url = 'https://financialmodelingprep.com/api/v3';
    private const API_KEY = '2f048f780ea386ee4a2be1cf3f82b912';

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function getFullFinancialReport(string $ticker)
    {
        try {
            $url = $this->convertToUrl('financial-statement-full-as-reported', $ticker, []);
            $response = $this->client->get($url);
            $response_body = $response->getBody();

            return json_decode($response_body, true, 512, JSON_THROW_ON_ERROR);
        } catch (GuzzleException|JsonException $e) {
            return null;
        }
    }

    private function convertToUrl(string $type_method, string $ticker, array $get_params): string
    {
        $builder_params = http_build_query(...$get_params, ...['apikey' => self::API_KEY]);
        return "$this->base_url/$type_method/$ticker?$builder_params";
    }
}
