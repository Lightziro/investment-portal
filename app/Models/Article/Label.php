<?php

namespace App\Models\Article;

use App\Custom\CustomModel;

/**
 * @property int label_id
 * @property string code
 * @property string icon
 */
class Label extends CustomModel
{
    protected $table = 'labels';
    protected $primaryKey = 'label_id';
}
