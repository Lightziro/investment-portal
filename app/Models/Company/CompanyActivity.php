<?php

namespace App\Models\Company;

use App\Custom\CustomModel;

/**
 * @property int activity_id
 * @property string name
 */
class CompanyActivity extends CustomModel
{
    public $timestamps = false;
    protected $table = 'company_activity';
    protected $primaryKey = 'activity_id';
}
