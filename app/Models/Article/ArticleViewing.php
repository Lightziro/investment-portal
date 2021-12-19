<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\HasOne;

/** ArticleViewing - просмотры статьи
 * @property int viewing_id
 * @property Article article
 * @property User user
 * @property int user_id
 * @property int article_id
 */
class ArticleViewing extends CustomModel
{
    protected $table = 'article_viewing';
    protected $primaryKey = 'viewing_id';

//    public function article(): HasOne
//    {
//        return $this->hasOne(Article::class, 'article_id', 'article_id');
//    }
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
