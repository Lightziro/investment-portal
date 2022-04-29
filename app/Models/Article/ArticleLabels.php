<?php

namespace App\Models\Article;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int article_id
 * @property int label_id
 * @property string text
 * @property-read Label $label
 */
class ArticleLabels extends CustomModel
{
    protected $table = 'article_labels';
    public $timestamps = false;

    public function label(): BelongsTo
    {
        return $this->belongsTo(Label::class, 'label_id', 'label_id');
    }
}
