<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;

/**
 * @property int status_id
 * @property string name
 * @property string description
 */
class InvestmentIdeaStatuses extends CustomModel
{
    public const STATUS_CREATED = 'created';
    public const STATUS_PUBLISHED = 'published';
    public const STATUS_FAILED = 'failed';
    public const STATUS_ANALYZED = 'analyzed';

    public $timestamps = null;
    protected $table = 'investment_idea_statuses';
    protected $primaryKey = 'status_id';
}
