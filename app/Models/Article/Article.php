<?php

namespace App\Models\Article;

use App\Custom\CustomModel;

/**
 * @property int article_id
 * @property string title
 * @property string content
 */
class Article extends CustomModel
{
    protected $table = 'investment_articles';
    protected $primaryKey = 'article_id';
}
