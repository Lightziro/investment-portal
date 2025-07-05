<?php

namespace App\Models\User;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * @property User user
 * @property int user_id
 * @property int notice_id
 * @property string description
 * @property bool viewed
 * @property string title
 * @property Carbon created_at
 * @property Carbon updated_at
 */
class UserNotices extends Model
{
    protected $primaryKey = 'notice_id';
    protected $table = 'user_notices';
    protected $fillable = ['viewed', 'title', 'description'];
}
