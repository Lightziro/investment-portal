<?php

namespace App\Models\Investment;

use App\Custom\CustomCollection;
use App\Custom\CustomModel;
use App\Custom\Relations\CustomHasMany;
use App\Models\Other\Company;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use JetBrains\PhpStorm\Pure;

/** Модель инвестиционной идеи
 * @property int idea_id
 * @property User author
 * @property int author_id
 * @property float price_buy
 * @property float price_sell
 * @property bool is_short
 * @property string stock_name
 * @property Company company
 * @property int company_id
 * @property InvestmentIdeaComments[] comments
 * @property string date_create
 * @property string date_end
 * @property string description
 * @property float possible_profit
 * @property int status_id
 * @property InvestmentIdeaStatuses $status
 * @property CustomCollection analyze
 * @property CustomCollection|AnalyticalQuestion[] questions
 */
class InvestmentIdea extends CustomModel
{
    protected $table = 'investment_ideas';
    protected $primaryKey = 'idea_id';

    #[Pure] public function getCommentsFrontend(): array
    {
        /** @var InvestmentIdeaComments $comment_model */
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

    public function status(): HasOne
    {
        return $this->hasOne(InvestmentIdeaStatuses::class, 'status_id', 'status_id');
    }

    public function analyze(): CustomHasMany
    {
        return $this->hasMany(InvestmentIdeaAnalyze::class, 'idea_id', 'idea_id');
    }

    public function questions(): HasManyThrough
    {
        return $this->hasManyThrough(
            AnalyticalQuestion::class,
            InvestmentIdeaAnalyze::class,
            'idea_id',
            'question_id',
            'idea_id',
            'question_id'
        );
    }

    /** Возвращает итоговый балл проанализированной идеи
     * @return mixed
     */
    public function getScoreAnalyze(): mixed
    {
        return $this->questions->sum('score');
    }
    public function getFrontendAuthor(): array
    {
        $author_model = $this->author;
        return [
            'userId' => $author_model->user_id,
            'avatar' => $author_model->avatar_path,
            'totalIdeas' => $author_model->investment_ideas->count(),
            'amountSuccessfulIdeas' => $author_model->investment_ideas()->with('status', fn($query) => $query
                ->where(['status' => InvestmentIdeaStatuses::STATUS_PUBLISHED]))->count(),
            'amountFailIdeas' => $author_model->investment_ideas()->with('status', fn($query) => $query
                ->where(['status' => InvestmentIdeaStatuses::STATUS_FAILED]))->count(),
            'fullName' => (string)$author_model,
        ];
    }
}
