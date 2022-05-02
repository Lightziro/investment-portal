<?php

namespace App\Models\Other;

use App\Custom\CustomModel;

/**
 * @property Activity $activity
 * @property Season $season
 * @property int $season_id
 * @property int $activity_id
 */
class ActivityWorkingSeason extends CustomModel
{
    protected $table = 'activity_working_seasons';
}
