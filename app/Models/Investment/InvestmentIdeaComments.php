<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;

class InvestmentIdeaComments extends CustomModel
{
    protected $table = 'investment_idea_comments';
    protected $primaryKey = 'comment_id';
}
