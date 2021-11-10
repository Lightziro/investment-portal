<?php

namespace App\Http\Classes;

use DateTime;
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

    public function getCompanyExecutives(string $ticker): CompanyExecutive|array
    {
        /** Not working, because no premium account */
        try {
            return $this->client->companyExecutive($ticker);
        } catch (ApiException $e) {
            return [];
        }
    }

    public function getFinancialsStats(string $tiker): ?BasicFinancials
    {
        try {
            return $this->client->companyBasicFinancials($tiker, 'all');
        } catch (ApiException $e) {
            return null;
        }
    }

    public function getRecommendationAnalytics(string $ticker): ?array
    {
        try {
            return $this->client->recommendationTrends($ticker);
        } catch (ApiException $e) {
            return null;
        }
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

    public function getReportedCompany(string $ticker, string $type_report = 'annual'): ?FinancialsAsReported
    {
        try {
            return $this->client->financialsReported($ticker, $type_report);
        } catch (ApiException $e) {
            return null;
        }
    }

    public function getLastQuote(string $ticker): ?Quote
    {
        try {
            return $this->client->quote($ticker);
        } catch (ApiException $e) {
            return null;
        }
    }
    public function getStockByName(string $name): array|SymbolLookup
    {
        try {
            return $this->client->symbolSearch($name);
        }catch (ApiException $e) {
            return [];
        }
    }

}
