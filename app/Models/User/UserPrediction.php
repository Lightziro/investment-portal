<?php

namespace App\Models\User;

use App\Models\Company\Company;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property-read User $user
 * @property-read Company $company
 * @property float $price
 * @property Carbon created_at
 * @property Carbon updated_at
 */
class UserPrediction extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'user_predictions';
    protected $fillable = ['user_id', 'amount', 'price', 'transfer_id', 'company_id', 'is_top'];

    protected $casts = [
        'price' => 'float'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id', 'company_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
