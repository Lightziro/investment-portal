<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasOne;
use JetBrains\PhpStorm\Pure;

/**
 * @property int comment_id
 * @property int article_id
 * @property Article article
 * @property User user
 * @property int user_id
 * @property string comment
 * @property Carbon created_at
 */
class ArticleComments extends CustomModel
{
    protected $table = 'article_comments';
    protected $primaryKey = 'comment_id';
    protected $with = ['user'];
    const UPDATED_AT = null;


    public function article(): HasOne
    {
        return $this->hasOne(Article::class, 'article_id', 'article_id');
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
