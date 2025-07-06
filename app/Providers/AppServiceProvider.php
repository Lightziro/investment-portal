<?php

namespace App\Providers;

use App\Custom\PersonalAccessToken;
use App\Models\TelegramUser;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
//    /**
//     * Register any application services.
//     *
//     * @return void
//     */
//    public function register(): void
//    {
//        if ($this->app->environment('local')) {
//            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
//            $this->app->register(TelescopeServiceProvider::class);
//        }
//    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        Auth::viaRequest('custom-token', function (Request $request) {
            $value = $request->bearerToken();

            return User::query()->firstWhere('password', $value);
        });
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
