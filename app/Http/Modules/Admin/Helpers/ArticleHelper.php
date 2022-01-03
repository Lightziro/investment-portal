<?php

namespace App\Http\Modules\Admin\Helpers;

use App\Models\Article\Article;
use App\Models\User\UserNotices;
use App\Models\User\UserSubscriptions;

class ArticleHelper
{
    public static function sendNotices(Article $article_model, string $type): void
    {
        /** @var UserSubscriptions[] $subscriptions */
        if ($subscriptions = UserSubscriptions::query()->where(['entity_id' => $article_model->article_id, 'entity_type' => 'article'])->get()) {
            switch ($type) {
                case 'update':
                    $title = "Author updated information of the article";
                    $description = <<<DESCRIPTION
Information in the article '$article_model->title' updated. Read it by clicking on the <a class='link-notice' href='/article/$article_model->article_id'>link</a>
DESCRIPTION;
                    break;
            }
            foreach ($subscriptions as $subscription) {
                $notice_model = new UserNotices();
                $notice_model->user_id = $subscription->user_id;
                $notice_model->title = $title ?? '';
                $notice_model->description = $description ?? '';
                $notice_model->viewed = false;
                $notice_model->save();
            }
        }
    }
}
