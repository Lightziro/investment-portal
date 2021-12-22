<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;

/**
 * @property int question_id
 * @property string description
 * @property float score
 * @property string code
 */
class AnalyticalQuestion extends CustomModel
{
    protected $table = 'analytical_questions';
    protected $primaryKey = 'question_id';

    public function __toString()
    {
        return $this->code;
    }
}
