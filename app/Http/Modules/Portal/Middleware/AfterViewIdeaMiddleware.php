<?php

namespace App\Http\Modules\Portal\Middleware;

use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\User\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;

/* От одного пользователя возможно выполнить просмотр 1 раз за день */

class AfterViewIdeaMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        /** @var User $user */
        if ($response->getStatusCode() === 200 && $user = $request->user()) {

            /** @var InvestmentIdea $idea */
            $idea = $request->route()->parameter('idea');

            $idea_view = InvestmentIdeaViewing::query()->where([
                'idea_id' => $idea->getKey(),
                'user_id' => $user->user_id
            ])->whereDate('created_at', Carbon::today())->first();

            if (!$idea_view) {
                $idea_view = new InvestmentIdeaViewing();
                $idea_view->user_id = $user->user_id;
                $idea_view->idea_id = $idea->getKey();
                $idea_view->save();
            }
        }
        return $response;
    }
}
