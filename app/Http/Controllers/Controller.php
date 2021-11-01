<?php

namespace App\Http\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(): Factory|View|Application
    {
        return view('welcome');
    }

    public function getNews(): JsonResponse
    {
//        try {
//            $user = User::query()->where('user_id', 1)->get();
//        } catch (\Throwable $exception) {
//            $a = '';
//        }
        $market = new StockMarket();
        $news = $market->getMarketNews();
        return response()->json($news);
    }
}
