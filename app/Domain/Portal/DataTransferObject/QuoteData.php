<?php

namespace App\Domain\Portal\DataTransferObject;

class QuoteData
{
    public function __construct(
        private int $companyId,
        private string $companyName,
        private float|null $lastPrice,
        private float|null $percentChangeToday,
        private string|null $currency = 'USD',
        private string|null $logoPath,
    )
    {
    }

    public function getCompanyId(): int
    {
        return $this->companyId;
    }

    public function getCompanyName(): string
    {
        return $this->companyName;
    }

    public function getLastPrice(): ?float
    {
        return $this->lastPrice;
    }

    public function getPercentChangeToday(): ?float
    {
        return $this->percentChangeToday;
    }

    public function geCurrency()
    {
        return $this->currency;
    }

    public function getLogoPath()
    {
        return $this->logoPath;
    }
}
