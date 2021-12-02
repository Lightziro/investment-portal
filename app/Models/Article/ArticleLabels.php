<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property ArticleLabel label
 * @property int article_id
 * @property int label_id
 * @property string text
 */
class ArticleLabels extends CustomModel
{
    protected $table = 'article_label';
    public $timestamps = false;

    public function label(): HasOne
    {
        return $this->hasOne(ArticleLabel::class, 'label_id', 'label_id');
    }
}
