<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $emotion_id
 * @property int $user_id
 * @property Carbon $created_at
 * @property int $article_id
 * @property string $emotion_code
 * @property-read User $user
 * @property-read Article $article
 */
class ArticleEmotion extends CustomModel
{
    protected $table = 'article_emotions';
    protected $primaryKey = 'emotion_id';
    protected $fillable = ['user_id', 'article_id', 'emotion_code'];
    const UPDATED_AT = null;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class, 'article_id', 'article_id');
    }
}
