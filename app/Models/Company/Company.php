<?php

namespace App\Models\Company;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $company_id
 * @property string $name
 * @property string $ticker
 * @property string $logo
 * @property string $industry_work
 * @property Carbon|null $date_ipo
 * @property string $currency
 * @property int $activity_id;
 * @property CompanyActivity $activity
 */
class Company extends Model
{
    protected $primaryKey = 'company_id';

    protected $table = 'companies';
    protected $with = ['activity'];

    protected $casts = [
        'date_ipo' => 'date'
    ];

    public function __toString()
    {
        return $this->name;
    }

    public function activity(): HasOne
    {
        return $this->hasOne(CompanyActivity::class, 'activity_id', 'activity_id');
    }
}
