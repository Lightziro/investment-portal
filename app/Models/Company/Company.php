<?php

namespace App\Models\Company;

use App\Common\Trait\Entity;
use App\Enums\TypeMarketParse;
use App\Models\Other\Activity;
use App\Models\User\UserPrediction;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Log;

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
    use Entity;

    protected $primaryKey = 'company_id';

    protected $table = 'quotes';
    protected $fillable = ['logo_path', 'name', 'ticker', 'show_top', 'type_market_parse'];


    protected $casts = [
        'date_ipo' => 'date',
        'show_top' => 'boolean',
        'type_market_parse' => TypeMarketParse::class,
    ];
//    protected function castAttribute($key, $value)
//    {
//        Log::error('castAttribute', ['key' => $key, 'value' => $value]);
//        $val = parent::castAttribute($key, $value);
//        return $val;
//    }

//    public function __toString()
//    {
//        return $this->name;
//    }

//    public function activity(): HasOne
//    {
//        return $this->hasOne(Activity::class, 'activity_id', 'activity_id');
//    }
//
    public function getName(): string
    {
        return $this->name;
    }
//
//    public function predictions()
//    {
//        return $this->hasMany(UserPrediction::class, 'company_id', 'company_id');
//    }
//
}
