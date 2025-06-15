<?php

namespace App\Domain\Portal\Response;

use App\Domain\Portal\DataTransferObject\QuoteData;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property QuoteData resource
 */
class QuoteListResponse extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'company_id' => $this->resource->getCompanyId(),
            'name' => $this->resource->getCompanyName(),
            'last_price' => $this->resource->getLastPrice(),
            'percent_change_today' => $this->resource->getPercentChangeToday(),
        ];
    }
}
