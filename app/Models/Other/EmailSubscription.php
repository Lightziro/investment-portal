<?php

namespace App\Models\Other;

use App\Custom\CustomModel;

class EmailSubscription extends CustomModel
{
    protected $table = 'email_subscriptions';
    protected $primaryKey = 'subscription_id';
    const UPDATED_AT = null;
    protected $fillable = ['email'];
}
