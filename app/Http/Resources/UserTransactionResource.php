<?php

namespace App\Http\Resources;

use App\Enums\BalanceUp;
use App\Models\User\UserBalanceTransfer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property-read UserBalanceTransfer $resource
 */
class UserTransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $name = $this->resource->event->toName();
        switch ($this->resource->event) {
            case BalanceUp::DEAL:
                $prediction = $this->resource->prediction;
                if ($prediction) {
                    $type = $prediction->is_top ? 'Лонг' : 'Шорт';
                    $name = "Сделка($type) по " . $prediction->company->name;
                }
                break;
            case BalanceUp::DEAL_CLOSE:
                $prediction = $this->resource->predictionClose;
                $name = "Закрытие сделки";
                if ($prediction) {
                    $type = $prediction->is_top ? 'Лонг' : 'Шорт';
                    $name = "Закрытие сделки($type) по " . $prediction->company->name;
                }
        }
        return [
            'createdAt' => $this->resource->created_at,
            'amount' => $this->resource->amount,
            'event' => $this->resource->event,
            'name' => $name
        ];
    }
}
