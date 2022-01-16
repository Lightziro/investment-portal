<?php

namespace App\Http\Modules\Admin\Middleware;

use App\Models\User\User;
use App\Models\User\UsersRole;
use Closure;
use Illuminate\Http\Request;

class BeforeCheckRootAdmin
{
    public function handle(Request $request, Closure $next)
    {
        /** @var User $user */
        if ($user = $request->user()) {
            if ($user->role->name === UsersRole::ROLE_ADMIN) {
                return $next($request);
            }
        }
        return response()->json([], 403);
    }
}
