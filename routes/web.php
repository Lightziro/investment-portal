<?php

use App\Http\Modules\Auth\Controllers\UserLoginController;
use App\Http\Modules\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::post('login', [UserLoginController::class, 'login']);
Route::get('get-user', [UserController::class, 'getUser']);
Route::get('logout', [UserLoginController::class, 'logout']);
