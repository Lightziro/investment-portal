<?php


namespace App\Custom\Traits;


use Illuminate\Database\Eloquent\Model;

trait ModelHelperTrait
{
    public static function replaceUpdateField(Model &$model, array $fields): void
    {
        foreach ($fields as $name_field => $value) {
            $field_name = static::FRONTEND_FIELD[$name_field];
            if (!$field_name || $field_name === $model->getKeyName() || $model->$field_name === $value) {
                continue;
            }
            $model->$field_name = $value;
        }
    }
}
