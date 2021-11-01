<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class RootAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        if (!empty($_COOKIE['token'])) {
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user->count() > 0) {
                if ($user->role->code = 'ADM') {
                    return $next($request);
                }
            }
        }
        return redirect('/');
    }
}
