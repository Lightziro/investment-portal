<?php

namespace App\Http\Modules\Core\Middleware;

use App\Models\User\User;
use Closure;

class BeforeCheckNoAuthUser
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
