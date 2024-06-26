<?php

use App\Http\Modules\Admin\Controllers\ArticleAdminController;
use App\Http\Modules\Admin\Controllers\CompanyAdminController;
use App\Http\Modules\Admin\Controllers\CreateIdeaController;
use App\Http\Modules\Admin\Controllers\InvestmentDataController;
use App\Http\Modules\Admin\Controllers\InvestmentIdeaController;
use App\Http\Modules\Admin\Controllers\UserController as UserAdminController;
use App\Http\Modules\Admin\Middleware\BeforeCheckRootAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/investment-data', [InvestmentDataController::class, 'getInvestmentData']);
Route::get('/companies/{query}', [InvestmentDataController::class, 'getCompanies']);

Route::group(
    [
        'prefix' => 'article',
        'middleware' => [
            'auth:sanctum',
            BeforeCheckRootAdmin::class
        ]
    ],
    function () {
        Route::get('/list/{page}', [ArticleAdminController::class, 'getArticlesByPage']);
        Route::post('/', [ArticleAdminController::class, 'createArticle']);

        Route::group(
            [
                'prefix' => '{article}',
                'where' => [
                    'article' => '\d+',
                ],
            ],
            function () {
                Route::post('/', [ArticleAdminController::class, 'updateArticle']);
                Route::delete('/', [ArticleAdminController::class, 'deleteArticle']);
                Route::get('/', [ArticleAdminController::class, 'getItemArticle']);
            }
        );
    }
);

Route::group(
    [
        'prefix' => 'idea',
        'middleware' => [
            BeforeCheckRootAdmin::class
        ]
    ],
    function () {
        Route::get('/get-stats', [InvestmentDataController::class, 'getStats']);
        Route::post('/create', [CreateIdeaController::class, 'analyzeIdea']);
        Route::get('/list/{page}', [InvestmentDataController::class, 'getIdeasByPage']);
        Route::group(
            [
                'prefix' => '{idea}',
                'where' => [
                    'idea' => '\d+',
                ],
            ],
            function () {
                Route::get('/', [InvestmentIdeaController::class, 'getItemIdea']);
                Route::post('/', [CreateIdeaController::class, 'publishIdea']);
            }
        );
    }
);

Route::group(
    [
        'prefix' => 'user',
        'middleware' => [
            'auth:sanctum',
            BeforeCheckRootAdmin::class
        ]
    ],
    function () {
        Route::get('/list/{page}', [UserAdminController::class, 'getUsersByPage']);
        Route::get('/get-stats', [UserAdminController::class, 'getStats']);
        Route::put('/{user}', [UserAdminController::class, 'update']);
        Route::get('/{user}', [UserAdminController::class, 'get']);
        Route::delete('/{user}', [UserAdminController::class, 'delete']);
    }
);

Route::group(['prefix' => 'company', 'middleware' => ['auth:sanctum', BeforeCheckRootAdmin::class]], function () {
    Route::get('/list/{page}', [CompanyAdminController::class, 'getCompaniesByPage']);
    Route::post('/', [CompanyAdminController::class, 'createCompany']);

    Route::group(
        [
            'prefix' => '{company}',
            'where' => [
                'article' => '\d+',
            ],
        ],
        function () {
            Route::post('/', [CompanyAdminController::class, 'updateCompany']);
            Route::get('/', [CompanyAdminController::class, 'getItem']);
        }
    );
});
