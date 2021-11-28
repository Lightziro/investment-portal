<?php

namespace App\Http\Modules\Profile\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\App;

class ProfileHelper
{
    private const FRONTEND_FIELD = [
        'firstName' => 'first_name',
        'lastName' => 'last_name',
        'country' => 'country_id',
        'userId' => 'user_id',
    ];

    public static function replaceUpdateField(User &$user_model, array $fields)
    {
        foreach ($fields as $name_field => $value) {
            $field_name = self::FRONTEND_FIELD[$name_field];
            if (!$field_name || $field_name === $user_model->getKeyName() || $user_model->$field_name === $value) {
                continue;
            }
            $user_model->$field_name = $value;
        }
    }
}
