<?php

namespace App\Domain\Portal\Service;

use App\Domain\Portal\DataTransferObject\QuoteData;
use App\Domain\Portal\Repository\CompanyRepository;
use App\Enums\TypeMarketParse;
use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
use App\Services\TinkoffStockMarket;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class QuoteService
{
    public function __construct(private readonly CompanyRepository $companyRepository, private readonly StockMarket $stockMarket, private readonly TinkoffStockMarket $tinkoffStockMarket)
    {
    }

    public function getQuoteList()
    {
        return Cache::remember('quote', now()->addMinutes(3), function () {
            $stocks = $this->companyRepository->getTopList();
            $stocksData = collect();

            /** @var Company $company */
            foreach ($stocks as $company) {
                $quoteInfo = $this->getQuoteInfo($company);
                if (!$quoteInfo) {
                    continue;
                }
                $stocksData->push($quoteInfo);
            }
            return $stocksData;
        });
    }

    public function getQuoteInfo(Company $company): ?QuoteData
    {
        return Cache::remember("quote-{$company->ticker}", now()->addMinutes(3), function () use ($company) {
            switch ($company->type_market_parse) {
                case TypeMarketParse::FIN_HUB:
                    $quoteInfo = $this->stockMarket->getLastQuote($company->ticker);
                    if (!$quoteInfo) {
                        return null;
                    }
                    return new QuoteData(
                        $company->getKey(),
                        $company->getName(),
                        data_get($quoteInfo, 'c'),
                        data_get($quoteInfo, 'dp'),
                        $company->currency,
                        $company->logo_path,
                    );
                case TypeMarketParse::TINKOFF:
                    $quoteLastPrice = $this->tinkoffStockMarket->getStockInfo($company->external_id);
                    Log::error('quoteInfo', [$quoteLastPrice]);
                    return new QuoteData(
                        $company->getKey(),
                        $company->getName(),
                        data_get($quoteLastPrice, 'current_price'),
                        data_get($quoteLastPrice, 'change_percent'),
                        $company->currency,
                        $company->logo_path,
                    );
            }
        });
    }

    public static function calculatePercentageChange(float $before, float $after): float
    {
        if ($before == 0.0) {
            // Защита от деления на ноль
            return $after === 0.0 ? 0.0 : INF;
        }

        return round((($after - $before) / $before) * 100, 2);
    }
}
