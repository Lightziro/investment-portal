<?php

namespace App\Http\Modules\Admin\Helpers;

use App\Custom\GlobalHelpers\ToolHelper;
use App\Models\Company\Company;
use App\Models\Company\WorkingSeasonsActivity;
use App\Models\Investment\InvestmentIdea;
use App\Models\Other\Season;

class AnalyticsHelper
{
    public Company $company;
    public InvestmentIdea $idea;
    public array $totalNews = ['positive' => 0, 'negative' => 0];

    public function __construct(InvestmentIdea $idea)
    {
        $this->idea = $idea;
        $this->company = $idea->company;
    }

    public function prepareNews(string $data_news): void
    {
        $ar_news = json_decode($data_news, true);
        foreach ($ar_news as $news_item) {
            $result = $news_item['prediction'];
            if (in_array($result, ['positive', 'negative']) && $news_item['sentiment_score'] > 0.75) {
                $this->totalNews[$result]++;
            }
        }
    }

    public function analyticCHECKING_WORKING_IN_SEASONS(): bool
    {
        $activityCompany = $this->company->activity;
        $workAllYear = $activityCompany->workingSeasons()->firstWhere('code', Season::CODE_WHOLE_YEAR);
        if ($workAllYear) {
            return true;
        }
        $season = ToolHelper::getSeasonsByMonth();

        $workSeason = $activityCompany->workingSeasons()->firstWhere('code', $season);

        if ($workSeason) {
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
        return $this->totalNews['positive'] > $this->totalNews['negative'];
    }

    public function analyticCHECKING_DATE_IPO(): bool
    {
        if ($date = $this->company->date_ipo) {
            $current_year = now()->year;
            return $current_year - 2 > $date;
        }
        return true; // Скорее всего компания давно на бирже, раз дата не определенна
    }
}
