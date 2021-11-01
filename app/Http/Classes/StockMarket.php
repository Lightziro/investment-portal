<?php

namespace App\Http\Classes;

use DateTime;
use Finnhub\Api\DefaultApi;
use Finnhub\ApiException;
use Finnhub\Configuration;
use Finnhub\Model\CompanyProfile2;
use Finnhub\Model\IPOCalendar;
use GuzzleHttp\Client;

class StockMarket
{
    private string $api_key = 'c5pu62qad3ib146a39ng';
    private Configuration $config;
    private DefaultApi $client;

    public function __construct()
    {
        $this->config = Configuration::getDefaultConfiguration()->setApiKey('token', 'c5pu62qad3ib146a39ng');
        $this->client = new DefaultApi(
            new Client(),
            $this->config
        );
    }

    public function getMarketNews(string $market = 'general', int|bool $limit = false): array
    {
        try {
            return $this->client->marketNews($market, 0) ?? [];
        } catch (ApiException $e) {
            return [];
        }
    }
    public function getIPOCalendar(DateTime $from, DateTime $to): ?IPOCalendar
    {
        try {
            return $this->client->ipoCalendar($from, $to);
        } catch (ApiException $e) {
            return null;
        }
    }

    public function getCompanyProfile(string $company_name): ?CompanyProfile2
    {
        try {
            return $this->client->companyProfile2($company_name);
        } catch (ApiException $e) {
            return null;
        }
    }

}
