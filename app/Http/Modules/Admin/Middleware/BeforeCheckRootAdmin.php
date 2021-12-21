<?php

namespace App\Http\Modules\Admin\Middleware;

use App\Models\User\User;
use Closure;

class BeforeCheckRootAdmin
{
    public function handle($request, Closure $next)
    {
        if (!empty($_COOKIE['token'])) {
            /** @var User $user */
            $user = User::query()->where('remember_token', $_COOKIE['token'])->first();
            if ($user && $user->role->name === 'admin') {
                return $next($request);
            }
        }
        return redirect('/');
    }
}
