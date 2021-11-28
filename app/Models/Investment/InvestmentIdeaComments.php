<?php

namespace App\Models\Investment;

use App\Custom\CustomModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasOne;
use JetBrains\PhpStorm\ArrayShape;
use JetBrains\PhpStorm\Pure;

/**
 * @property User user
 * @property string comment
 * @property int user_id
 * @property int idea_id
 * @property string created_at
 */
class InvestmentIdeaComments extends CustomModel
{
    protected $table = 'investment_idea_comments';
    protected $primaryKey = 'comment_id';
    const UPDATED_AT = null;

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'user_id', 'user_id');
    }

    #[Pure] public function getFrontendComment(): array
    {
        $author_model = $this->user;
        return [
            'userId' => $author_model->user_id,
            'date' => $this->created_at,
            'fullNameAuthor' => $author_model->getFullName(),
            'comment' => $this->comment,
            'avatar' => $author_model->avatar_path
        ];
    }
}
