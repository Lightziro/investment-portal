<?php

namespace App\Http\Modules\Portal\Middleware;

use App\Models\Article\ArticleViewing;
use App\Models\User\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Collection;

class AfterViewArticleMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        if (!empty($_COOKIE['token'])) {
            /** @var User|Collection $user */
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user) {
                $article_id = $response->getData()->articleId;
                $idea_view = ArticleViewing::query()->where(['article_id' => $article_id, 'user_id' => $user->user_id])
                    ->whereDate('created_at', Carbon::today())->first();

                if (!$idea_view) {
                    $idea_view = new ArticleViewing();
                    $idea_view->user_id = $user->user_id;
                    $idea_view->article_id = $article_id;
                    $idea_view->save();
                }
            }
        }
        return $response;
    }
}
