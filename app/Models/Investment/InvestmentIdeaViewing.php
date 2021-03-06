<?php

namespace App\Models\Investment;

use App\Models\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int user_id
 * @property int idea_id
 */
class InvestmentIdeaViewing extends Model
{
    protected $table = 'investment_idea_viewing';
    const UPDATED_AT = null;

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_view_id');
    }
}
