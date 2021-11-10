<?php

namespace App\Http\Modules\Admin\Helpers;

use App\Custom\GlobalHelpers\ToolHelper;
use App\Models\Analytics\AnalyticsQuestions;
use App\Models\Company\WorkingSeasonsActivity;
use App\Models\Other\Company;

class AnalyticsHelper
{
    public Company $company;

    public function __construct(string $company_ticker)
    {

    }

    public function analyticCHECKING_WORKING_IN_SEASONS(float $score): float
    {
        $activity_company = $this->company->activity;
        $season = ToolHelper::getSeasonsByMonth();

        $activity_season = WorkingSeasonsActivity::query()->where([
            'activity_id' => $activity_company->activity_id,
            'season' => $season
        ])->orWhere(['all_year' => true, 'activity_id' => $activity_company->activity_id])->first();
        if ($activity_season) {
            return $score;
        }
        return 0;
    }
    public function analyticsACTIVITY_RELEVANT_FULL_YEAR(float $score): float
    {
        $activity_company = $this->company->activity;
        $season_model = WorkingSeasonsActivity::query()->where([
            'activity_id' => $activity_company->activity_id,
            'all_year' => true
        ])->first();
        if ($season_model) {
            return $score;
        }
        return 0;
    }
}
