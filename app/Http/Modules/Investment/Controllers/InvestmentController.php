<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\InvestmentIdea;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Cookie;

class InvestmentController extends BaseController
{
    public function createInvestmentIdea()
    {

    }

    public function getData(): mixed
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return redirect('/');
        }
        /** @var User $user */
        $user = User::query()->where('remember_token', $cookie['token'])->first();
        $ar_data = [
            'viewToday' => 0,
            'likedToday' => 0,
        ];
        $investment_ideas = $user->investment_ideas;
        foreach ($investment_ideas as $idea_model) {
            $ar_data['viewToday'] += $idea_model->views()->whereDate('date_view', Carbon::today())->count();
            $ar_data['likedToday'] += $idea_model->reaction()->where('reaction', '=', 'Liked')->count();

        }
        return response()->json($ar_data);
    }
    public function getPortalData(): JsonResponse
    {
        $max_profit = InvestmentIdea::query()->max('profit');
        $min_profit = InvestmentIdea::query()->min('profit');

        $market = new StockMarket();
        $news = $market->getMarketNews();

        return response()->json([
            'bestProfit' => $max_profit,
            'worseProfit' => $min_profit,
            'news' => $news
        ]);
    }
}
