<?php

namespace App\Models;

use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Other\Country;
use App\Models\User\UserNotices;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use JetBrains\PhpStorm\Pure;

/**
 * @property int user_id
 * @property string email
 * @property string password
 * @property string first_name
 * @property string last_name
 * @property string remember_token
 * @property UsersRole|null role
 * @property null|int role_id
 * @property InvestmentIdea|null investment_ideas
 * @property UserNotices[] notices
 * @property string avatar_path
 * @property Carbon created_at
 * @property Country country
 * @property string sex
 */
class User extends Authenticatable
{
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'role_id', 'avatar_path'
    ];
    protected $primaryKey = 'user_id';

    public function authentication(array $params = null): bool
    {
        return Auth::attempt($params, true);
    }

    #[Pure] public function getFrontendData(): array
    {
        $ar_notice = [];
        foreach ($this->notices as $notice_model) {
            $ar_notice[] = [
                'id' => $notice_model->notice_id,
                'description' => $notice_model->description,
                'viewed' => $notice_model->viewed,
                'title' => $notice_model->title,
                'created' => $notice_model->date_create
            ];
        }
        return [
            'userId' => $this->user_id,
            'fullName' => $this->getFullName(),
            'role' => $this->role->name,
            'notices' => $ar_notice,
            'avatar' => $this->avatar_path,
        ];
    }

    public function getProfile(): array
    {
        $country_model = $this->country;
        return [
            'userId' => $this->user_id,
            'name' => [
              'fullName' => $this->getFullName(),
              'firstName' => $this->first_name,
              'lastName' => $this->last_name,
            ],
            'fullName' => $this->getFullName(),
            'dateCreate' => $this->created_at->format('Y-m-d'),
            'allComments' => $this->comments()->count(),
            'avatar' => $this->avatar_path,
            'roleName' => (string)$this->role,
            'country' => [
                'country_id' => $country_model->country_id,
                'code' => $country_model->code,
                'name' => $country_model->name,
            ],
            'sex' => $this->sex
        ];
    }

    public function role(): HasOne
    {
        return $this->hasOne(UsersRole::class, 'role_id', 'role_id');
    }

    public function investment_ideas(): HasMany
    {
        return $this->hasMany(InvestmentIdea::class, 'author_id', 'user_id');
    }

    public function notices(): HasMany
    {
        return $this->hasMany(UserNotices::class, 'user_id');
    }

    public function getFullName(): string
    {
        $first_name = ucfirst($this->first_name);
        $second_name = ucfirst($this->last_name);
        return "$second_name $first_name";
    }

    public function comments(): HasMany
    {
        return $this->hasMany(InvestmentIdeaComments::class, 'user_id', 'user_id');
    }

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'country_id', 'country_id');
    }
}
