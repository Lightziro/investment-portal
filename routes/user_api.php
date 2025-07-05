<?php


use App\Http\Modules\Auth\Controllers\UserLoginController;
use App\Http\Modules\PersonalAccount\Controllers\MainStatsController;
use App\Http\Modules\PersonalAccount\Controllers\PredictionController;
use App\Http\Modules\User\Controllers\UserActionController;
use App\Http\Modules\User\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserLoginController::class, 'login']);
Route::get('/authentication', [UserActionController::class, 'authentication'])->middleware('auth:sanctum');
Route::put('/notice/view', [UserActionController::class, 'viewNotice'])->middleware('auth:sanctum');
Route::post('/register', [UserLoginController::class, 'register']);
Route::put('/{user}', [UserController::class, 'update'])->middleware('auth:sanctum')->name('update');
Route::post('/forgot-password', [UserActionController::class, 'forgotPassword']);
Route::post('/recovery-password', [UserActionController::class, 'recoveryPassword']);
Route::get('/notices', [UserController::class, 'getNotices']);
Route::get('/transactions', [UserController::class, 'getTransactions']);
Route::get('/stats', MainStatsController::class);
Route::get('/balance', [UserActionController::class, 'getBalance'])->middleware('auth:sanctum');

Route::group(['prefix' => 'predictions', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/list', [PredictionController::class, 'getList']);
    Route::post('/', [PredictionController::class, 'create'])->name('create-prediction');
    Route::post('/{predict}/close', [PredictionController::class, 'closePredict']);
    Route::delete('/{predict}', [PredictionController::class, 'deletePredict']);
    Route::put('/{predict}', [PredictionController::class, 'updatePredict'])->name('update-predict');
});
Route::group(['prefix' => 'balance', 'middleware' => 'auth:sanctum'], function () {
   Route::post('/up-get-link', [UserActionController::class, 'getLinkUpBalance']);
});
