<?php

    namespace App\Models\Investment;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string reaction
 */
class InvestmentIdeaDescriptions extends Model
{
    protected $table = 'investment_idea_descriptions';
    protected $primaryKey = 'description_id';
}
