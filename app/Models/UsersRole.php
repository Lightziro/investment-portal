<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int role_id
 * @property string code
 * @property string name
 */
class UsersRole extends Model
{
    protected $table = 'users_role';

    public function __toString()
    {
        return "$this->code, $this->name";
    }

}
