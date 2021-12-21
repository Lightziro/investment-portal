<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/** Модель анализа инвестиционных идей от нейронной сети
 * @property int analyze_id
 * @property int idea_id
 * @property InvestmentIdea idea
 * @property AnalyticalQuestion question
 */
class InvestmentIdeaAnalyze extends CustomModel
{
    protected $table = 'investment_idea_analyze';
    protected $primaryKey = 'analyze_id';

    public function idea(): BelongsTo
    {
        return $this->belongsTo(InvestmentIdea::class, 'idea_id', 'idea_id');
    }
    public function question(): HasOne
    {
        return $this->hasOne(AnalyticalQuestion::class, 'question_id', 'question_id');
    }
}
