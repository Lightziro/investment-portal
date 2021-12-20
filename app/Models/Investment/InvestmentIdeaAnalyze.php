<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/** Модель анализа инвестиционных идей от нейронной сети
 * @property int analyze_id
 * @property int idea_id
 * @property InvestmentIdea idea
 */
class InvestmentIdeaAnalyze extends CustomModel
{
    protected $table = 'investment_idea_analyze';
    protected $primaryKey = 'analyze_id';

    public function idea(): BelongsTo
    {
        return $this->belongsTo(InvestmentIdea::class);
    }
}
