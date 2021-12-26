<?php

use App\Http\Modules\Admin\Controllers\ArticleAdminController;
use App\Http\Modules\Admin\Controllers\CreateIdeaController;
use App\Http\Modules\Admin\Controllers\InvestmentDataController;
use App\Http\Modules\Admin\Controllers\SmartAnalyticController;
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
Route::group(['prefix' => 'article'], function () {
    Route::post('/create', [ArticleAdminController::class, 'createArticle'])->middleware(BeforeGetAuthUserId::class);
    Route::post('/update', [ArticleAdminController::class, 'updateArticle'])->middleware(BeforeGetAuthUserId::class);
    Route::get('/get/{page}', [ArticleAdminController::class, 'getArticlesByPage'])->middleware(BeforeGetAuthUserId::class);
    Route::post('/delete', [ArticleAdminController::class, 'deleteArticle'])->middleware(BeforeGetAuthUserId::class);
});
Route::group(['prefix' => 'investment-idea'], function () {
    Route::post('/create', [CreateIdeaController::class, 'analyzeIdea'])->middleware(BeforeGetAuthUserId::class);
});
