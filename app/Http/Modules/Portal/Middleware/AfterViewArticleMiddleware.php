<?php

namespace App\Http\Modules\Portal\Middleware;

use App\Models\Article\ArticleViewing;
use App\Models\User\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;

class AfterViewArticleMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        /** @var User $user */
        if ($response->getStatusCode() === 200 && ($user = $request->user())) {
            if ($article_id = $request->route()->parameter('id')) {

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
