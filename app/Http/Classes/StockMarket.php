<?php

namespace App\Http\Classes;

use DateTime;
use Exception;
use Finnhub\Api\DefaultApi;
use Finnhub\ApiException;
use Finnhub\Configuration;
use Finnhub\Model\BasicFinancials;
use Finnhub\Model\CompanyExecutive;
use Finnhub\Model\CompanyProfile2;
use Finnhub\Model\FinancialsAsReported;
use Finnhub\Model\IPOCalendar;
use Finnhub\Model\Quote;
use Finnhub\Model\SymbolLookup;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class StockMarket
{
    private string $api_key = 'c5pu62qad3ib146a39ng';
    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://finnhub.io/api/v1/',
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'X-Finnhub-Token' => $this->api_key,
            ],
        ]);
    }

    public function getCompanyExecutives(string $ticker): CompanyExecutive|array
    {
        /** Not working, because no premium account */
        try {
            return $this->client->companyExecutive($ticker);
        } catch (ApiException $e) {
            return [];
        }
    }

    public function getFinancialsStats(string $ticker): ?array
    {
        try {
            $data = $this->client->get("stock/metric?symbol=$ticker&metric=all");
            return json_decode($data->getBody(), true);
        } catch (Exception $e) {
            return null;
        }
    }

    public function getRecommendationAnalytics(string $ticker): ?array
    {
        try {
            $data = $this->client->get("stock/recommendation?symbol=$ticker");
            return json_decode($data->getBody(), true);
        } catch (Exception $e) {
            return null;
        }
    }

    public function getMarketNews(string $market = 'general', int|bool $limit = false): array
    {
        try {
            $response =  $this->client->get("news?category=$market") ?? [];
            $data = json_decode($response->getBody(), true);
            Log::error('data', [$data]);
            return $data;
        } catch (Exception $e) {
            Log::debug('exception', [$e]);
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

    public function getCompanyProfile(string $companyName): ?array
    {
        try {
            $data = $this->client->get("stock/profile2?symbol=$companyName");
            Log::error('data company', [$data]);
            return json_decode($data->getBody(), true);
        } catch (Exception $e) {
            Log::error('exc', [$e]);
            return null;
        }
    }

    public function getReportedCompany(string $ticker, string $type_report = 'annual'): ?FinancialsAsReported
    {
        try {
            return $this->client->financialsReported($ticker, $type_report);
        } catch (ApiException $e) {
            return null;
        }
    }

    public function getLastQuote(string $ticker): ?array
    {
        try {
            $data = $this->client->get("quote?symbol=$ticker");
            return json_decode($data->getBody(), true);
        } catch (Exception $e) {
            Log::error('ex', [$e]);
            return null;
        }
    }
    public function getStockByName(string $name): ?array
    {
        try {
            $data = $this->client->get("search?q=$name");
            return json_decode($data->getBody(), true);
        }catch (Exception $e) {
            return [];
        }
    }
    public function getCompanyNews(string $ticker, DateTime $from, DateTime $to): ?array
    {
        try {
            $from = $from->format('Y-m-d');
            $to = $to->format('Y-m-d');
            $data = $this->client->get("company-news?symbol=$ticker&from=$from&to=$to");
            Log::error('debugCompany', [$data->getBody()]);
            return json_decode($data->getBody(), true);
        } catch (Exception $e) {
            Log::error('ex', [$e]);
            return null;
        }
    }

}
