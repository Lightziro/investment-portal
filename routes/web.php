<?php

use App\Http\Modules\Article\Controllers\ArticleActionsController;
use App\Http\Modules\Auth\Controllers\UserLoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
//Route::view('/{path?}', 'welcome')
//    ->where('path', '.*')
//    ->name('react');
//
Route::post('login', [UserLoginController::class, 'login']);
Route::get('get-user', [UserLoginController::class, 'getUser']);
Route::get('logout', [UserLoginController::class, 'logout']);

Route::group(['prefix' => 'article-actions'], function () {
    Route::post('/create-comment', [ArticleActionsController::class, 'createComment']);
});


