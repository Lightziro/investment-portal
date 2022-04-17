<?php

use App\Http\Modules\Admin\Controllers\ArticleAdminController;
use App\Http\Modules\Admin\Controllers\CompanyAdminController;
use App\Http\Modules\Admin\Controllers\CreateIdeaController;
use App\Http\Modules\Admin\Controllers\InvestmentDataController;
use App\Http\Modules\Admin\Controllers\InvestmentIdeaController;
use App\Http\Modules\Admin\Controllers\SmartAnalyticController;
use App\Http\Modules\Admin\Controllers\UserController as UserAdminController;
use App\Http\Modules\Admin\Middleware\BeforeCheckRootAdmin;
use App\Http\Modules\Profile\Middleware\BeforeGetAuthUserId;
use Illuminate\Support\Facades\Route;

Route::get('/investment-data', [InvestmentDataController::class, 'getInvestmentData']);
Route::get('/companies/{query}', [InvestmentDataController::class, 'getCompanies']);
Route::post('/classification-news', [CreateIdeaController::class, 'predictNews']);
Route::group(['prefix' => 'smart-analytic'], function () {
    Route::get('/data', [SmartAnalyticController::class, 'getAnalyticData']);
    Route::get('/last-news', [SmartAnalyticController::class, 'getNewsForAnalyze']);
});

Route::group(['prefix' => 'article', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::post('/create', [ArticleAdminController::class, 'createArticle']);
    Route::post('/update', [ArticleAdminController::class, 'updateArticle']);
    Route::get('/get-item/{id}', [ArticleAdminController::class, 'getItemArticle']);
    Route::get('/list/{page}', [ArticleAdminController::class, 'getArticlesByPage']);
    Route::post('/delete', [ArticleAdminController::class, 'deleteArticle'])->middleware(BeforeGetAuthUserId::class);
});

Route::group(['prefix' => 'idea', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::get('/get-item/{idea}', [InvestmentIdeaController::class, 'getItemIdea']);
    Route::post('/create', [CreateIdeaController::class, 'analyzeIdea']);
    Route::get('/list/{page}', [InvestmentDataController::class, 'getIdeasByPage']);
    Route::post('/publish', [CreateIdeaController::class, 'publishIdea']);
    Route::get('/get-stats', [InvestmentDataController::class, '']);
});

Route::group(['prefix' => 'user', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::get('/list/{page}', [UserAdminController::class, 'getUsersByPage']);
    Route::get('/get-stats', [UserAdminController::class, 'getStats']);
    Route::put('/{user}', [UserAdminController::class, 'update']);
    Route::get('/{user}', [UserAdminController::class, 'get']);
    Route::delete('/{user}', [UserAdminController::class, 'delete']);
});

Route::group(['prefix' => 'company', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::get('/list/{page}', [CompanyAdminController::class, 'getCompaniesByPage']);
});
