<?php

namespace App\Models\Other;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string name
 * @property string ticker
 */
class Company extends Model
{
    protected $primaryKey = 'company_id';

    protected $table = 'companies';
}
