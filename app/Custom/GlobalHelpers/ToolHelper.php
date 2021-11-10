<?php

namespace App\Custom\GlobalHelpers;

class ToolHelper
{
    public const SEASONS_NUMBER = [
        'Winter',
        'Spring',
        'Summer',
        'Autumn'
    ];

    public static function getSeasonsByMonth(int $num_month = null): string
    {
        if (!$num_month) {
            $num_month = date('n');
        }
        $result = floor(date($num_month) / 3);
        return self::SEASONS_NUMBER[$result];
    }
}
