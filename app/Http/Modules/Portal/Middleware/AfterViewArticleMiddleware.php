<?php

namespace App\Http\Modules\Portal\Middleware;

use App\Models\Article\Article;
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

            /** @var Article $article */
            $article = $request->route()->parameter('article');

            $article_view = ArticleViewing::query()->where([
                'article_id' => $article->getKey(),
                'user_id' => $user->user_id
            ])->whereDate('created_at', Carbon::today())->first();

            if (!$article_view) {
                $article_view = new ArticleViewing();
                $article_view->user_id = $user->getKey();
                $article_view->article_id = $article->getKey();
                $article_view->save();
            }
        }
        return $response;
    }
}
