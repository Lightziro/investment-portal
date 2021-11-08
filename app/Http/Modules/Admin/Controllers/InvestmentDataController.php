<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Models\Investment\InvestmentIdeaViewing;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Cookie;

class InvestmentDataController extends Controller
{
    public function getInvestmentData(): Application|RedirectResponse|Redirector|JsonResponse
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return redirect('/');
        }
        $ar_response['viewToday'] = InvestmentIdeaViewing::query()->whereDate('created_at', Carbon::today())->count() ?? null;
        return response()->json($ar_response);
    }
}
