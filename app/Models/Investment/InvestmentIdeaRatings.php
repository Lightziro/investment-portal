<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;

/**
 * @property int rating_id
 * @property int user_id
 * @property int idea_id
 * @property int score
 *
 */
class InvestmentIdeaRatings extends CustomModel
{
    protected $table = 'investment_idea_ratings';
    protected $primaryKey = 'rating_id';
    protected $fillable = ['score', 'user_id'];
    const UPDATED_AT = null;
}
