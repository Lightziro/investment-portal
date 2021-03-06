<?php

namespace App\Custom\Query;


use App\Custom\CustomModel;
use App\Custom\Relations\CustomHasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class CustomQueryBuilder extends Builder
{
    public function getRelatedWithOrderByCount(string $field, string $order_by_field, string $sort_by = 'DESC'): Collection
    {
        /** @var CustomModel $model */
        $model = $this->getModel();
        $model_table = $model->getTable();
        /** @var CustomHasMany $relationship_field */
        $relationship_field = $model->$field();

        $related_table = $relationship_field->getModel()->getTable();

        return DB::table($model_table)
            ->select(DB::raw("$model_table.*, count($related_table.$order_by_field) AS $field"))
            ->leftJoin(
                "$related_table",
                "$model_table.{$relationship_field->getLocalKeyName()}",
                '=',
                "$related_table.{$relationship_field->getForeignKeyName()}"
            )->groupBy("$model_table.idea_id")->orderBy($field, 'DESC')->get();
    }
}
