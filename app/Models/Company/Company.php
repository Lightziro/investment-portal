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
    protected $fillable = ['logo_path', 'name', 'ticker', 'show_top'];

    protected $casts = [
        'date_ipo' => 'date',
        'show_top' => 'boolean',
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
