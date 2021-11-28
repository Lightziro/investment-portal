<?php

namespace App\Models\Other;

use App\Custom\CustomModel;

/**
 * @property int country_id
 * @property string code
 * @property string name
 */
class Country extends CustomModel
{
    protected $table = 'countries';
    protected $primaryKey = 'country_id';
}
