<?php

use App\Http\Modules\Article\Controllers\ArticleActionsController;
use App\Http\Modules\Auth\Controllers\UserLoginController;
use App\Http\Modules\Portal\Controllers\ViewController;
use App\Http\Modules\Portal\Middleware\AfterViewArticleMiddleware;
use App\Http\Modules\Portal\Middleware\AfterViewIdeaMiddleware;
use App\Http\Modules\Profile\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::post('login', [UserLoginController::class, 'login']);
Route::get('get-user', [UserLoginController::class, 'getUser']);
Route::get('logout', [UserLoginController::class, 'logout']);

Route::group(['prefix' => 'user'], function() {
    Route::post('/update', [ProfileController::class, 'updateProfileData']);
});

Route::group(['prefix' => 'article'], function () {
    Route::get('/get/{id}', [ViewController::class, 'getViewArticle'])->middleware(AfterViewArticleMiddleware::class);
    Route::post('/create-comment', [ArticleActionsController::class, 'createComment']);
});
Route::group(['prefix' => 'profile'], function () {
   Route::get('/get/{id}', [ViewController::class, 'getViewProfile']);
});
Route::group(['prefix' => 'idea'], function() {
   Route::get('/get/{id}', [ViewController::class, 'getViewIdea'])->middleware(AfterViewIdeaMiddleware::class);
});


