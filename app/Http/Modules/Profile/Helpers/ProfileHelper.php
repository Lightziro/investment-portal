<?php

namespace App\Http\Modules\Profile\Helpers;


use App\Custom\Traits\ModelHelperTrait;

class ProfileHelper
{
    use ModelHelperTrait;

    private const FRONTEND_FIELD = [
        'firstName' => 'first_name',
        'lastName' => 'last_name',
        'country' => 'country_id',
        'userId' => 'user_id',
        'sex' => 'sex',
        'role' => 'role_id',
    ];
}
