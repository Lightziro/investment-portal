<?php

namespace App\Models\Other;

use App\Custom\CustomModel;

/**
 * @property int country_id
 * @property string code
 * @property string name
 * @method static orderBy(string $string)
 */
class Country extends CustomModel
{
    protected $table = 'countries';
    protected $primaryKey = 'country_id';
}
