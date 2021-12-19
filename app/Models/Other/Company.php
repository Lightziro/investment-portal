<?php

namespace App\Models\Other;

use App\Models\Company\CompanyActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int company_id
 * @property string name
 * @property string ticker
 * @property string logo
 * @property string industry_work
 * @property string date_ipo
 * @property string currency
 * @property int activity_id;
 * @property CompanyActivity activity
 */
class Company extends Model
{
    protected $primaryKey = 'company_id';

    protected $table = 'companies';

    public function __toString()
    {
        return $this->name;
    }

    public function activity(): HasOne
    {
        return $this->hasOne(CompanyActivity::class, 'activity_id', 'activity_id');
    }
}
