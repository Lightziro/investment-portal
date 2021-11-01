<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int notice_id
 * @property string description
 * @property bool viewed
 * @property string title
 * @property string date_create
 */
class UserNotices extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'notice_id';
    protected $table = 'user_notices';
    protected $fillable = ['viewed'];
}
