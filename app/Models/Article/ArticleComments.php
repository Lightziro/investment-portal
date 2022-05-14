<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $comment_id
 * @property int $article_id
 * @property Article $article
 * @property User $user
 * @property int $user_id
 * @property string $comment
 */
class ArticleComments extends CustomModel
{
    protected $table = 'article_comments';
    protected $primaryKey = 'comment_id';
    protected $with = ['user'];
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
