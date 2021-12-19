<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\Other\Company;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $ar_response['commentsToday'] = InvestmentIdeaComments::query()->whereDate('created_at', Carbon::today())->count() ?? null;
        return response()->json($ar_response);
    }

    public function getCompanies(string $query): JsonResponse
    {
        $companies = Company::query()->where('name', 'LIKE', "%{$query}%");
        if ($companies->count() > 0) { // Поиск по базе
            /** @var Company $company */
            foreach ($companies->limit(5)->get() as $company) {
                $ar_company[] = (string)$company;
            }
        }
        return response()->json($ar_company ?? []);
    }
}
