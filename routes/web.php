<?php

use App\Http\Modules\Core\Controllers\OtherController;
use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'welcome')
    ->where('path', '.*')
    ->name('react');

Route::get('/image', [OtherController::class, 'getImage']);


