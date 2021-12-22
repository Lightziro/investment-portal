<?php

namespace App\Http\Modules\Admin\Helpers;

use App\Custom\GlobalHelpers\ToolHelper;
use App\Models\Company\WorkingSeasonsActivity;
use App\Models\Investment\InvestmentIdea;
use App\Models\Other\Company;

class AnalyticsHelper
{
    public Company $company;
    public InvestmentIdea $idea;
    public array $totalNews;

    public function __construct(InvestmentIdea $idea)
    {
        $this->idea = $idea;
    }

    public function analyticCHECKING_WORKING_IN_SEASONS(): bool
    {
        $activity_company = $this->company->activity;
        $season = ToolHelper::getSeasonsByMonth();

        $activity_season = WorkingSeasonsActivity::query()->where([
            'activity_id' => $activity_company->activity_id,
            'season' => $season
        ])->orWhere(['all_year' => true, 'activity_id' => $activity_company->activity_id])->first();
        if ($activity_season) {
            return true;
        }
        return false;
    }
    public function analyticACTIVITY_RELEVANT_FULL_YEAR(): bool
    {
        $activity_company = $this->company->activity;
        $season_model = WorkingSeasonsActivity::query()->where([
            'activity_id' => $activity_company->activity_id,
            'all_year' => true
        ])->first();
        if ($season_model) {
            return true;
        }
        return false;
    }
    public function analyticCHECKING_NEWS_MOOD(): bool
    {
        if ($this->totalNews['positive'] > $this->totalNews['negative']) {
            return true;
        }
        return false;
    }
}
