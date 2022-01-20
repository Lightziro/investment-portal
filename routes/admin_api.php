<?php

use App\Http\Modules\Admin\Controllers\ArticleAdminController;
use App\Http\Modules\Admin\Controllers\CreateIdeaController;
use App\Http\Modules\Admin\Controllers\InvestmentDataController;
use App\Http\Modules\Admin\Controllers\InvestmentIdeaController;
use App\Http\Modules\Admin\Controllers\SmartAnalyticController;
use App\Http\Modules\Admin\Controllers\UsersAdminController;
use App\Http\Modules\Admin\Middleware\BeforeCheckRootAdmin;
use App\Http\Modules\Profile\Middleware\BeforeGetAuthUserId;
use Illuminate\Support\Facades\Route;

Route::get('/investment-data', [InvestmentDataController::class, 'getInvestmentData']);
Route::get('/companies/{query}', [InvestmentDataController::class, 'getCompanies']);
Route::post('/classification-news', [CreateIdeaController::class, 'predictNews']);
Route::group(['prefix' => 'smart-analytic'], function () {
    Route::get('/data', [SmartAnalyticController::class, 'getAnalyticData']);
    Route::get('/last-news', [SmartAnalyticController::class, 'getNewsForAnalyze']);
    Route::post('/train-news-classifier', [SmartAnalyticController::class, 'trainNewsClassifier']);
});
Route::group(['prefix' => 'article', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::post('/create', [ArticleAdminController::class, 'createArticle']);
    Route::post('/update', [ArticleAdminController::class, 'updateArticle']);
    Route::get('/get-item/{id}', [ArticleAdminController::class, 'getItemArticle']);
    Route::get('/get/{page}', [ArticleAdminController::class, 'getArticlesByPage']);
    Route::post('/delete', [ArticleAdminController::class, 'deleteArticle'])->middleware(BeforeGetAuthUserId::class);
});
Route::group(['prefix' => 'investment-idea', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::get('/get/{id}', [InvestmentIdeaController::class, 'getItemIdea']);
    Route::post('/create', [CreateIdeaController::class, 'analyzeIdea']);
});
Route::group(['prefix' => 'users', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::get('/get/{page}', [UsersAdminController::class, 'getUsersByPage']);
    Route::get('/get-stats', [UsersAdminController::class, 'getStats']);
    Route::put('/update', [UsersAdminController::class, 'updateUser']);
});
