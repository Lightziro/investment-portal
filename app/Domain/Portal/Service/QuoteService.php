<?php

namespace App\Domain\Portal\Service;

use App\Domain\Portal\DataTransferObject\QuoteData;
use App\Domain\Portal\Repository\CompanyRepository;
use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class QuoteService
{
    public function __construct(private readonly CompanyRepository $companyRepository, private readonly StockMarket $stockMarket)
    {
    }

    public function getQuoteList()
    {
        return Cache::remember('quote', now()->addMinutes(3), function () {
            $stocks = $this->companyRepository->getTopList();
            $stocksData = collect();

            /** @var Company $company */
            foreach ($stocks as $company) {
                $quoteInfo = $this->stockMarket->getLastQuote($company->ticker);
                if (!$quoteInfo) {
                    continue;
                }
                $stocksData->push(new QuoteData(
                    $company->getKey(),
                    $company->getName(),
                    data_get($quoteInfo, 'c'),
                    data_get($quoteInfo, 'dp'),
                ));
            }
            return $stocksData;
        });
    }
}
