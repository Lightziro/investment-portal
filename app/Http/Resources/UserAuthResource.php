<?php

namespace App\Http\Resources;

use App\Enums\BalanceUp;
use App\Models\User\User;
use App\Models\User\UserBalanceTransfer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read User $resource
 */
class UserAuthResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'token' => $this->resource->password,
            'data' => $this->resource->getFrontendData(),
        ];
    }
}
