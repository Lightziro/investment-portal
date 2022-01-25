<?php

namespace App\Models\Investment;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string reaction
 */
class InvestmentIdeaRatings extends Model
{
    protected $table = 'investment_idea_ratings';
    protected $primaryKey = 'rating_id';
}
