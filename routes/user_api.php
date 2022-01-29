<?php


use App\Http\Modules\Auth\Controllers\UserActionController;
use App\Http\Modules\Auth\Controllers\UserLoginController;
use App\Http\Modules\Core\Controllers\UserController;
use App\Http\Modules\Core\Middleware\BeforeClearAuthUser;
use App\Http\Modules\Profile\Controllers\ProfileController;
use App\Http\Modules\Profile\Middleware\BeforeGetAuthUserId;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserLoginController::class, 'login'])->middleware(BeforeClearAuthUser::class);
Route::get('/authentication', [UserActionController::class, 'authentication'])->middleware('auth:sanctum');
Route::post('/notice/view', [UserController::class, 'viewNotice'])->middleware('auth:sanctum');
Route::post('/register', [UserLoginController::class, 'register'])->middleware(BeforeClearAuthUser::class);
Route::get('/profile/{id}', [UserController::class, 'getProfile']);
Route::post('/profile/update', [ProfileController::class, 'updateProfileData'])->middleware('auth:sanctum');
Route::get('/exit', [UserActionController::class, 'exitUser']);
Route::post('/forgot-password', [UserActionController::class, 'forgotPassword']);
Route::post('/recovery-password', [UserActionController::class, 'recoveryPassword']);
