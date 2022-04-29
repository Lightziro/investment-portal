<?php

namespace App\Models\Other;

use App\Custom\CustomModel;

/**
 *@property int $season_id
 *@property string $name
 *@property string $code
 */
class Season extends CustomModel
{
    public const SEASON_CODE_WINTER = 'winter';
    public const SEASON_CODE_SPRING = 'spring';
    public const SEASON_CODE_SUMMER = 'summer';
    public const SEASON_CODE_AUTUMN = 'autumn';
    public const CODE_WHOLE_YEAR = 'whole-year';

    protected $table = 'seasons';
    protected $primaryKey = 'season_id';
}
