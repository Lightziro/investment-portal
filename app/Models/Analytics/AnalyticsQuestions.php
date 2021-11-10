<?php

namespace App\Models\Analytics;

use App\Custom\CustomModel;

/**
 * @property float score
 */
class AnalyticsQuestions extends CustomModel
{
    protected $table = 'analytical_questions';
    protected $primaryKey = 'question_id';
}
