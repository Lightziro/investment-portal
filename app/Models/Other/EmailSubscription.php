<?php

namespace App\Models\Other;

use App\Custom\CustomModel;
use Carbon\CarbonInterface;

/**
 * @property int $subscription_id
 * @property string $email
 * @property CarbonInterface $created_at
 */
class EmailSubscription extends CustomModel
{
    protected $table = 'email_subscriptions';
    protected $primaryKey = 'subscription_id';
    const UPDATED_AT = null;
    protected $fillable = ['email'];
}
