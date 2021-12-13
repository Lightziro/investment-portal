<?php

namespace App\Http\Modules\Auth\Middleware;

use App\Models\User;
use App\Models\User\UserRecovery;
use Carbon\Carbon;
use Closure;

class CheckKeyRecoveryMiddleware
{
    public function handle($request, Closure $next)
    {
        $key = $request->route()->parameter('key');
        $today = Carbon::now();
        /** @var UserRecovery $recovery_model */
        $recovery_model = UserRecovery::query()->where(['key' => $key, 'accept' => false])
            ->whereBetween('created_at', [Carbon::now()->subHours(3), $today])->first();
        if ($recovery_model) {
            return $next($request);
        }
        return response()->redirectTo('/');
    }
}
