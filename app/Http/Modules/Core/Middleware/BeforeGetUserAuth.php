<?php

namespace App\Http\Modules\Core\Middleware;

use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\User;
use Carbon\Carbon;
use Closure;
use Illuminate\Support\Collection;

class BeforeGetUserAuth
{
    public function handle($request, Closure $next)
    {
        if (!empty($_COOKIE['token'])) {
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user->count() > 0) {
                $request->request->add(['userId' => $user->user_id]);
                return $next($request);
            }
        }
    }
}
