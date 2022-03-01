<?php


use App\Http\Modules\Auth\Controllers\UserLoginController;
use App\Http\Modules\Core\Middleware\BeforeClearAuthUser;
use App\Http\Modules\PersonalAccount\Controllers\PredictionController;
use App\Http\Modules\User\Controllers\UserActionController;
use App\Http\Modules\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserLoginController::class, 'login'])->middleware(BeforeClearAuthUser::class);
Route::get('/authentication', [UserActionController::class, 'authentication'])->middleware('auth:sanctum');
Route::post('/notice/view', [UserActionController::class, 'viewNotice'])->middleware('auth:sanctum');
Route::post('/register', [UserLoginController::class, 'register'])->middleware(BeforeClearAuthUser::class);
Route::put('/{user}', [UserController::class, 'update'])->middleware('auth:sanctum')->name('update');
Route::post('/forgot-password', [UserActionController::class, 'forgotPassword']);
Route::post('/recovery-password', [UserActionController::class, 'recoveryPassword']);
Route::get('/notices', [UserController::class, 'getNotices']);

Route::group(['prefix' => 'predictions', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/list', [PredictionController::class, 'getList']);
    Route::post('/create', [PredictionController::class, 'create'])->name('create-prediction');
    Route::delete('/{predict}', [PredictionController::class, 'deletePredict']);
});
