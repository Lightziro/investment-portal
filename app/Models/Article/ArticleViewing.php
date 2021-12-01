<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\HasOne;

/** ArticleViewing - просмотры статьи
 * @property int viewing_id
 * @property Article article
 */
class ArticleViewing extends CustomModel
{
    protected $table = 'article_viewing';
    protected $primaryKey = 'viewing_id';

    public function article(): HasOne
    {
        return $this->hasOne(Article::class, 'article_id', 'article_id');
    }
}
