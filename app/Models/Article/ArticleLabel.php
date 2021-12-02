<?php

namespace App\Models\Article;

use App\Custom\CustomModel;

/**
 * @property int label_id
 * @property string code
 * @property string icon
 */
class ArticleLabel extends CustomModel
{
    protected $table = 'article_labels';
    protected $primaryKey = 'label_id';
}
