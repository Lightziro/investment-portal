<?php

namespace App\Models\User;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $subscription_id
 * @property int $user_id
 */
class UserSubscriptions extends CustomModel
{
    public const SUBSCRIBE_ARTICLE = 'article';
    public const SUBSCRIBE_IDEA = 'idea';

    protected $table = 'user_subscriptions';
    protected $primaryKey = 'subscription_id';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
