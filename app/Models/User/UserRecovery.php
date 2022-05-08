<?php

namespace App\Models\User;

use App\Custom\CustomModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $recovery_id
 * @property int $user_id
 * @property User $user
 * @property string $recovery_ip
 * @property string $key
 * @property string $accept_ip
 * @property bool $accept
 */
class UserRecovery extends CustomModel
{
    protected $table = 'user_recovery';
    protected $primaryKey = 'recovery_id';
    protected $fillable = [
        'recovery_id',
        'user_id',
        'recovery_ip',
        'key',
        'accept_ip',
        'accept',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'accept' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
