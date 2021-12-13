<?php

namespace App\Models\User;

use App\Custom\CustomModel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * @property int recovery_id
 * @property int user_id
 * @property User user
 * @property string recovery_ip
 * @property string key
 * @property string accept_ip
 * @property bool accept
 * @property Carbon created_at
 * @property Carbon updated_at
 */
class UserRecovery extends CustomModel
{
    protected $table = 'user_recovery';
    protected $primaryKey = 'recovery_id';
    protected $fillable = ['recovery_id', 'user_id', 'recovery_ip', 'key', 'accept_ip', 'accept', 'created_at', 'updated_at'];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }
}
