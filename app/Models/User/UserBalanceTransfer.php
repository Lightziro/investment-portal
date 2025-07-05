<?php

namespace App\Models\User;

use App\Enums\BalanceUp;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property Carbon created_at
 * @property Carbon updated_at
 * @property BalanceUp $event
 * @property-read UserPrediction $prediction
 * @property-read UserPrediction $predictionClose
 * @property int $amount
 */
class UserBalanceTransfer extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'user_balance_transfers';
    protected $fillable = ['user_id', 'amount', 'event'];

    protected $casts = [
        'event' => BalanceUp::class,
    ];

    public function prediction()
    {
        return $this->hasOne(UserPrediction::class, 'transfer_id', 'id');
    }

    public function predictionClose()
    {
        return $this->hasOne(UserPrediction::class, 'close_transfer_id', 'id');
    }
}
