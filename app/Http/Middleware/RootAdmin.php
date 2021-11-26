<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\UsersRole;
use Closure;
use Illuminate\Http\Request;

class RootAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        if (!empty($_COOKIE['token'])) {
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user->count() > 0) {
                if ($user->role->code = UsersRole::ROLE_ADMIN) {
                    return $next($request);
                }
            }
        }
        return redirect('/');
    }
}
