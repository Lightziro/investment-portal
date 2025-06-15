<?php

namespace App\Domain\Portal\Response;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property array resource
 */
class NewsListResponse extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'headline' => data_get($this->resource, 'headline'),
            'datetime' => data_get($this->resource, 'datetime'),
            'id' => data_get($this->resource, 'id'),
            'url' => data_get($this->resource, 'url'),
        ];
    }
}
