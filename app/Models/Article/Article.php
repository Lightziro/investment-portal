<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use JetBrains\PhpStorm\ArrayShape;

/**
 * @property int article_id
 * @property string title
 * @property string content
 * @property Carbon created_at
 * @property Carbon updated_at
 * @property string preview_path
 * @property User author
 */
class Article extends CustomModel
{
    protected $table = 'investment_articles';
    protected $primaryKey = 'article_id';

    public function __toString()
    {
        return $this->title;
    }

    public function author(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'author_id');
    }

    public function getFrontend(): array
    {
        $author_model = $this->author;
        return [
            'articleId' => $this->article_id,
            'title' => (string)$this,
            'dateCreate' => $this->created_at,
            'dateUpdate' => $this->updated_at,
            'preview' => $this->preview_path,
            'content' => $this->content,
            'author' => [
                'userId' => $author_model->user_id,
                'fullName' => (string)$author_model,
                'avatar' => $author_model->avatar_path,
            ]
        ];
    }
}
