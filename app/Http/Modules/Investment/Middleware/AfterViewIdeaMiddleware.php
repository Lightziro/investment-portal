<?php

namespace App\Http\Modules\Investment\Middleware;

use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\User;
use Closure;

class AfterViewIdeaMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        if (!empty($_COOKIE['token'])) {
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user->count() > 0) {
                $idea_id = $response->getData()->ideaId;
                $idea_view = InvestmentIdeaViewing::query()->where(['idea_id' => $idea_id, 'user_id' => $user->user_id])->first();
                if (!$idea_view) {
                    $idea_view = new InvestmentIdeaViewing();
                    $idea_view->user_id = $user->user_id;
                    $idea_view->idea_id = $idea_id;
                    $idea_view->save();
                }
            }
        }
        return $response;
    }
}
