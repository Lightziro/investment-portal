<?php

namespace App\Models\Company;

use App\Models\Other\Activity;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $company_id
 * @property string $name
 * @property string $ticker
 * @property string $logo_path
 * @property string $industry_work
 * @property CarbonInterface|null $date_ipo
 * @property string $currency
 * @property int $activity_id;
 * @property-read Activity $activity
 */
class Company extends Model
{
    protected $primaryKey = 'company_id';

    protected $table = 'companies';
    protected $with = ['activity'];
    protected $fillable = ['logo_path'];

    protected $casts = [
        'date_ipo' => 'date'
    ];

    public function __toString()
    {
        return $this->name;
    }

    public function activity(): HasOne
    {
        return $this->hasOne(Activity::class, 'activity_id', 'activity_id');
    }
}
