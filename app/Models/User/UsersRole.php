<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int role_id
 * @property string name
 */
class UsersRole extends Model
{
    public const ROLE_USER = 'user';
    public const ROLE_ADMIN = 'admin';
    protected $table = 'roles';

    public function __toString()
    {
        return $this->name;
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'role_id');
    }

    public function getFrontendData(): array
    {
        return [
            'roleId' => $this->role_id,
            'name' => (string)$this
        ];
    }
}
