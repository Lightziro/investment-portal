<?php

namespace App\Models\Other;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

/**
 * @property int activity_id
 * @property string name
 * @property-read Season[]|Collection $workingSeasons
 */
class Activity extends CustomModel
{
    public $timestamps = false;
    protected $table = 'activities';
    protected $primaryKey = 'activity_id';

    public function workingSeasons(): HasManyThrough
    {
        return $this->hasManyThrough(
            Season::class,
            ActivityWorkingSeason::class,
            'activity_id',
            'season_id',
            'activity_id',
            'season_id'
        );
    }
}
