<?php
namespace App\Models\Company;
use App\Custom\CustomModel;

/**
 * @property int working_season_id
 * @property string season
 * @property bool all_year
 */
class WorkingSeasonsActivity extends CustomModel
{
    protected $primaryKey = 'working_season_id';
    protected $table = 'activity_working_seasons';
}
