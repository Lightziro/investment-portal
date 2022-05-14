<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int $comment_id
 * @property User $user
 * @property string $comment
 * @property int $user_id
 * @property int $idea_id
 */
class InvestmentIdeaComments extends CustomModel
{
    protected $table = 'investment_idea_comments';
    protected $primaryKey = 'comment_id';
    protected $with = ['user'];
    const UPDATED_AT = null;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
