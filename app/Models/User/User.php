<?php

namespace App\Models\User;

use App\Models\Article\ArticleComments;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Other\Country;
use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use JetBrains\PhpStorm\Pure;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * @property int $user_id
 * @property string $email
 * @property string $password
 * @property string $first_name
 * @property string $last_name
 * @property UsersRole|null $role
 * @property null|int $role_id
 * @property InvestmentIdea|Collection|null $investmentIdeas
 * @property UserNotices[]|Collection $notices
 * @property string $avatar_path
 * @property CarbonInterface $created_at
 * @property CarbonInterface $updated_at
 * @property Country|null $country
 * @property string $sex
 * @property Collection|ArticleComments[] $commentsArticles
 * @property Collection|UserSubscriptions[] $subscriptions
 * @property Collection|UserPredictions[] $predictions
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'users';
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role_id',
        'avatar_path',
        'country_id',
        'sex'
    ];
    protected $hidden = ['password', 'deleted_at', 'email'];
    protected $primaryKey = 'user_id';

    #[Pure] public function __toString()
    {
        return $this->getFullName();
    }

    public function authentication(array $params = null): bool
    {
        return Auth::attempt($params, true);
    }

    public function getFrontendData(): array
    {
        $notices = $this->notices()->orderByDesc('created_at')->limit(5)->get()->toArray();

        return array_merge($this->only(['user_id', 'first_name', 'last_name']), [
            'full_name' => $this->getFullName(),
            'role' => $this->role->name,
            'notices' => $notices ?? [],
            'avatar' => $this->avatar_path,
        ]);
    }

    public function role(): HasOne
    {
        return $this->hasOne(UsersRole::class, 'role_id', 'role_id');
    }

    public function investmentIdeas(): HasMany
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

    public function commentsIdeas(): HasMany
    {
        return $this->hasMany(InvestmentIdeaComments::class, 'user_id', 'user_id');
    }

    public function commentsArticles(): HasMany
    {
        return $this->hasMany(ArticleComments::class, 'user_id', 'user_id');
    }

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'country_id', 'country_id');
    }

    public function predictions(): HasMany
    {
        return $this->hasMany(UserPredictions::class, 'user_id', 'user_id');
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(UserSubscriptions::class, 'user_id', 'user_id');
    }

    public function toArray(): array
    {
        $attributes = parent::toArray();
        return array_merge($attributes, [
            'full_name' => (string)$this
        ]);
    }

    public function getProfile(): array
    {
        return array_merge($this->toArray(), [
            'count_comments' => $this->commentsIdeas()->count() + $this->commentsArticles()->count(),
            'country' => $this->country?->toArray(),
            'predictions' => $this->predictions()->where('visible', true)->get()->toArray() ?? [],
        ]);
    }
}
