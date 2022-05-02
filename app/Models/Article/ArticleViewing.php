<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $viewing_id
 * @property-read  Article $article
 * @property-read User $user
 * @property int $user_id
 * @property int $article_id
 * @property Carbon $created_at
 */
class ArticleViewing extends CustomModel
{
    protected $table = 'article_viewing';
    protected $primaryKey = 'viewing_id';
    const UPDATED_AT = null;

    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class, 'article_id', 'article_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
