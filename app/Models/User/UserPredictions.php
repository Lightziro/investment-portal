<?php

namespace App\Models\User;

use App\Custom\CustomModel;
use App\Models\Other\Company;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $prediction_id
 * @property User $user
 * @property int $user_id
 * @property Company $company
 * @property int $company_id
 * @property float $predict_price
 */
class UserPredictions extends CustomModel
{
    protected $table = 'user_predictions';
    protected $primaryKey = 'prediction_id';

    public function company(): HasOne
    {
        return $this->hasOne(Company::class, 'company_id', 'company_id');
    }
}
