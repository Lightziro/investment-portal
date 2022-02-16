<?php

namespace App\Models\Investment;

use App\Custom\CustomCollection;
use App\Custom\CustomModel;
use App\Custom\Query\CustomQueryBuilder;
use App\Custom\Relations\CustomHasMany;
use App\Models\Other\Company;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
 * @property InvestmentIdeaComments[]|Collection comments
 * @property InvestmentIdeaViewing[]|Collection views
 * @property InvestmentIdeaRatings[]|Collection ratings
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
    protected $fillable = ['price_buy', 'description', 'price_sell', 'is_short', 'status_id', 'date_end'];

    public function views(): HasMany
    {
        return $this->hasMany(InvestmentIdeaViewing::class, 'idea_id', 'idea_id');
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(InvestmentIdeaRatings::class, 'idea_id', 'idea_id');
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
        return $this->questions()->where(['result' => true])->sum('score');
    }

    public static function mostPopular(): Builder|CustomQueryBuilder
    {
        return self::query()
            ->withCount('views')
            ->orderBy('views_count', 'desc')
            ->with('status', callback: fn($query) => $query->whereNotIn('name', [InvestmentIdeaStatuses::STATUS_FAILED]));
    }

    public function getRatingStats(): array
    {
        for ($i = 5; $i >= 1; $i--) {
            $ar_rating[] = ['score' => $i, 'count' => $this->ratings->where('score', $i)->count()];
        }
        return [
            'avg' => $this->ratings->avg('score') ?? 0,
            'stats' => $ar_rating ?? null,
            'count' => $this->ratings->count()
        ];
    }
}
