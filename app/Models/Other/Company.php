<?php

namespace App\Models\Other;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string name
 * @property string ticker
 * @property string logo
 * @property string industry_work
 * @property string date_ipo
 */
class Company extends Model
{
    protected $primaryKey = 'company_id';

    protected $table = 'companies';
}
