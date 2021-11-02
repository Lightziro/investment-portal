<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserController;
use App\Http\Modules\Investment\Controllers\InvestmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('/news/all', [Controller::class, 'getNews']);
Route::group(['prefix' => 'user'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/authentication', [AuthController::class, 'authentication']);
    Route::post('/notice/view', [UserController::class, 'viewNotice']);
});

Route::group(['prefix' => 'news'], function () {
    Route::get('/all', [NewsController::class, 'getAllNews']);
});
Route::group(['prefix' => 'investment-data'], function () {
    Route::get('/get', [InvestmentController::class, 'getData']);
    Route::get('/portal', [InvestmentController::class, 'getPortalData']);
    Route::get('/idea/{id}', [InvestmentController::class, 'getInvestmentIdeaData']);
});

