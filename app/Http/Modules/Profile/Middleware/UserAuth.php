<?php

namespace App\Http\Modules\Profile\Middleware;

use App\Models\User;
use App\Models\UsersRole;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class UserAuth extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        if (!empty($_COOKIE['token'])) {
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user->count() > 0) {
                $request->request->add(['userId' => $user->user_id]);
                return $next($request);
            }
        }
        return redirect('/');
    }
}
