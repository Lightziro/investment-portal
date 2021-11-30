<?php

namespace App\Custom;

use App\Custom\Query\CustomQueryBuilder;
use App\Custom\Relations\CustomHasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;


abstract class CustomModel extends Model
{

    public function newEloquentBuilder($query): CustomQueryBuilder
    {
        return new CustomQueryBuilder($query);
    }

    public function hasMany($related, $foreignKey = null, $localKey = null): CustomHasMany
    {
        $instance = $this->newRelatedInstance($related);

        $foreignKey = $foreignKey ?: $this->getForeignKey();

        $localKey = $localKey ?: $this->getKeyName();

        return new CustomHasMany(
            $instance->newQuery(), $this, $instance->getTable() . '.' . $foreignKey, $localKey
        );
    }

    public function newCollection(array $models = []): CustomCollection
    {
        return new CustomCollection($models);
    }

    /**
     * @return CustomQueryBuilder|Builder
     */
    public static function query(): CustomQueryBuilder|Builder
    {
        return parent::query();
    }

    public function newQueryWithoutScopes(): Builder|CustomModel
    {
        return parent::newQueryWithoutScopes();
    }
}
