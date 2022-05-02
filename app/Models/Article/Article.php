<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Custom\Query\CustomQueryBuilder;
use App\Custom\Relations\CustomHasMany;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use JetBrains\PhpStorm\Pure;

/** Article - статьи
 * @property int $article_id
 * @property string $title
 * @property string $content
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $preview_path
 * @property User $author
 * @property int $author_id
 * @property Collection|ArticleLabels[] $labels
 * @property Collection|ArticleViewing[] $viewing
 * @property Collection|ArticleComments[] $comments
 * @property Collection|ArticleEmotion[] $emotions
 */
class Article extends CustomModel
{
    protected $table = 'articles';
    protected $primaryKey = 'article_id';
    protected $fillable = ['content', 'title'];
    protected $with = ['author'];

    public function __toString()
    {
        return $this->title;
    }

    public function author(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'author_id');
    }

    public function viewing(): HasMany
    {
        return $this->hasMany(ArticleViewing::class, 'article_id', 'article_id');
    }

    public static function mostPopular(): Builder|CustomQueryBuilder
    {
        return self::query()->withCount('viewing')->orderBy('viewing_count', 'desc');
    }

    public function labels(): HasMany
    {
        return $this->hasMany(ArticleLabels::class, 'article_id', 'article_id');
    }

    public function emotions(): CustomHasMany
    {
        return $this->hasMany(ArticleEmotion::class, 'article_id', 'article_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ArticleComments::class, 'article_id', 'article_id');
    }

    #[Pure] public function getLabels(): array
    {
        $ar_labels = [];
        foreach ($this->labels as $label_model) {
            $label = $label_model->label;
            $ar_labels[] = [
                'icon' => $label->icon,
                'text' => $label_model->text,
            ];
        }
        foreach (['carbon:view-filled', 'bx:bxs-comment-detail'] as $fake_label) {
            $text = match ($fake_label) {
                'carbon:view-filled' => $this->viewing->count(),
                'bx:bxs-comment-detail' => $this->comments->count(),
                default => '',
            };
            $ar_labels[] = [
                'icon' => $fake_label,
                'text' => $text
            ];
        }
        return $ar_labels;
    }
}
