<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});
Route::get('/auth/github', [AuthController::class, 'redirectToGithub']);
Route::get('/sign-in/github/redirect', [AuthController::class, 'authGitHub']);

Route::get('/', [Controller::class, 'index']);
Route::get('/investment-idea/{id}', [Controller::class, 'index']);
Route::get('/auth', [Controller::class, 'index']);
Route::get('/register', [Controller::class, 'index']);
Route::group(['prefix' => 'admin', 'middleware' => ['checkRoot']], function () {
    Route::get('investment-ideas', [Controller::class, 'index']);
});


