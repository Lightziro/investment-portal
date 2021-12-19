<?php

namespace App\Http\Modules\Auth\Middleware;

use App\Models\User\UserRecovery;
use Carbon\Carbon;
use Closure;

/**
 * Условия действия ключа:
 * - Ключ совпадает
 * - Ключ не был ещё использован
 * - Прошло не больше 3-х часов
 * - IP адрес восстановителя == IP адресу клиента
 */
class CheckKeyRecoveryMiddleware
{
    public function handle($request, Closure $next)
    {
        $key = $request->route()->parameter('key');
        $today = Carbon::now();
        /** @var UserRecovery $recovery_model */
        $recovery_model = UserRecovery::query()->where(['key' => $key, 'accept' => false])
            ->whereBetween('created_at', [Carbon::now()->subHours(3), $today])->first();

        if ($recovery_model && $recovery_model->recovery_ip === $_SERVER['REMOTE_ADDR']) {
            return $next($request);
        }
        return response()->redirectTo('/');
    }
}
