<?php

namespace App\Http\Modules\Core\Middleware;

use App\Custom\CustomCollection;
use App\Models\User\User;
use Closure;
use Illuminate\Http\Request;

class BeforeClearAuthUser
{
    public function handle(Request $request, Closure $next)
    {
        if (!empty($_COOKIE['token'])) {
            cookie()->forget('token');
        }
        return $next($request);
    }
}
