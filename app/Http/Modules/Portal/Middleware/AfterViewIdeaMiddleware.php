<?php

namespace App\Http\Modules\Portal\Middleware;

use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Collection;

/* От одного пользователя возможно выполнить просмотр 1 раз за день */
class AfterViewIdeaMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        if (!empty($_COOKIE['token'])) {
            /** @var User|Collection $user */
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user->count() > 0) {
                $idea_id = $response->getData()->ideaId;
                $idea_view = InvestmentIdeaViewing::query()->where(['idea_id' => $idea_id, 'user_id' => $user->user_id])
                    ->whereDate('created_at', Carbon::today())->first();

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
