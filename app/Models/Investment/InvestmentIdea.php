<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;
use App\Custom\Relations\CustomHasMany;
use App\Models\Other\Company;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use JetBrains\PhpStorm\Pure;

/**
 * @property int idea_id
 * @property User author
 * @property int author_id
 * @property float price_buy
 * @property float price_sell
 * @property bool is_short
 * @property string stock_name
 * @property Company company
 * @property InvestmentIdeaComments[] comments
 * @property string date_create
 * @property string date_end
 * @property string description
 * @property float possible_profit
 */
class InvestmentIdea extends CustomModel
{
    public const STATUS_FAIL = 'fail';
    public const STATUS_SUCCESS = 'success';
    protected $table = 'investment_ideas';
    protected $primaryKey = 'idea_id';

    #[Pure] public function getCommentsFrontend(): array
    {
        foreach ($this->comments()->orderByDesc('created_at')->get() as $comment_model) {
            $ar_comments[] = $comment_model->getFrontendComment();
        }
        return $ar_comments ?? [];
    }

    public function views(): HasMany
    {
        return $this->hasMany(InvestmentIdeaViewing::class, 'idea_id', 'idea_id');
    }

    public function reaction(): HasMany
    {
        return $this->hasMany(InvestmentIdeaReaction::class, 'idea_id', 'idea_id');
    }

    public function descriptions(): HasMany
    {
        return $this->hasMany(InvestmentIdeaDescriptions::class, 'idea_id', 'idea_id');
    }

    public function author(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'author_id');
    }

    public function calculatePossibleProfit(): float|int
    {
        if ($this->is_short) {
            return (($this->price_buy - $this->price_sell) / $this->price_sell) * 100;
        }
        return (($this->price_sell - $this->price_buy) / $this->price_buy) * 100;
    }

    public function company(): HasOne
    {
        return $this->hasOne(Company::class, 'company_id', 'company_id');
    }

    public function comments(): CustomHasMany
    {
        return $this->hasMany(InvestmentIdeaComments::class, 'idea_id', 'idea_id');
    }
}
