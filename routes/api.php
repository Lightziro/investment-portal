<?php

use App\Http\Modules\Article\Controllers\ArticleActionsController;
use App\Http\Modules\Core\Controllers\InitialDataController;
use App\Http\Modules\Core\Controllers\OtherController;
use App\Http\Modules\Core\Middleware\BeforeCheckNoAuthUser;
use App\Http\Modules\Investment\Controllers\InvestmentController;
use App\Http\Modules\Investment\Controllers\InvestmentIdeaController;
use App\Http\Modules\Portal\Controllers\ViewController;
use App\Http\Modules\Portal\Middleware\AfterViewArticleMiddleware;
use App\Http\Modules\Portal\Middleware\AfterViewIdeaMiddleware;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'investment-data'], function () {
    Route::get('/get', [InvestmentController::class, 'getPortalData']);
    Route::get('/news', [InvestmentController::class, 'getNews']);
    Route::get('/idea/{id}', [InvestmentIdeaController::class, 'getInvestmentIdeaData'])->middleware(AfterViewIdeaMiddleware::class);

});
Route::group(['prefix' => 'init'], function () {
    Route::get('/portal-data', [InitialDataController::class, 'getPortalInit']);
});

Route::group(['prefix' => 'idea'], function () {
    Route::post('/create-comment', [InvestmentIdeaController::class, 'createComment'])->middleware('auth:sanctum');
    Route::get('/get/{id}', [ViewController::class, 'getViewIdea'])->middleware([AfterViewIdeaMiddleware::class, 'auth:sanctum']);
});
Route::group(['prefix' => 'article'], function () {
    Route::get('/get/{id}', [ViewController::class, 'getViewArticle'])->middleware(AfterViewArticleMiddleware::class);
    Route::post('/create-comment', [ArticleActionsController::class, 'createComment'])->middleware('auth:sanctum');
});

Route::group(['prefix' => 'other'], function () {
    Route::get('/countries', [OtherController::class, 'getCountries']);
    Route::post('/subscribe-email', [OtherController::class, 'subscribeEmail']);
    Route::post('/upload-file', [OtherController::class, 'uploadFile']);
    Route::get('/roles', [OtherController::class, 'getRoles']);
});
Route::group(['prefix' => 'profile'], function () {
    Route::get('/get/{id}', [ViewController::class, 'getViewProfile']);
});
//Route::group(['prefix' => 'profile', 'middleware' => 'auth:sanctum'], function () {
//    Route::get('/get', [OtherController::class, 'basick']);
//});
