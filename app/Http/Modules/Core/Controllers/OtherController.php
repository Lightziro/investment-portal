<?php

namespace App\Http\Modules\Core\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
use App\Models\Other\Country;
use App\Models\Other\EmailSubscription;
use App\Models\User\UsersRole;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Throwable;

class OtherController extends Controller
{
    public function getCountries(): JsonResponse
    {
        $countries = Country::orderBy('name')->get()->toArray();
        return response()->json($countries);
    }

    public function getRoles(): JsonResponse
    {
        /** @var UsersRole[]|Collection $roles */
        $roles = UsersRole::query()->get()->toArray();
        return response()->json($roles);
    }

    public function subscribeEmail(Request $request): JsonResponse
    {
        try {
            $post = $request->post();
            if (EmailSubscription::query()->where(['email' => $post['email']])->first()) {
                throw new Exception('This email address has been signed');
            }
            $subscribe_model = new EmailSubscription(['email' => $post['email']]);
            $subscribe_model->save();
            return response()->json(['status' => true]);
        } catch (Throwable $e) {
            return response()->json(['status' => false], 400);
        }
    }

    public function getQuote(): JsonResponse
    {
        if (Cache::has('quote')) {
            $ar_stock = Cache::get('quote');
            return response()->json($ar_stock);
        }

        $stocks = Company::query()->whereIn('ticker', ['AAPL', 'V', 'MDB', 'BAC', 'TSLA', 'NFLX'])
            ->orderBy('name')->get(['name', 'ticker', 'company_id']);
        $market = new StockMarket();

        /** @var Company $company_model */
        foreach ($stocks as $company_model) {
            $quote_info = $market->getLastQuote($company_model->ticker);
            if ($quote_info) {
                $ar_stock[] = [
                    'company_id' => $company_model->getKey(),
                    'name' => $company_model->name,
                    'last_price' => $quote_info->getC(),
                    'percent_change_today' => $quote_info->getDp(),
                ];
            }
        }
        if (!empty($ar_stock)) {
            Cache::put('quote', $ar_stock, now()->addMinute());
        }
        return response()->json($ar_stock ?? []);
    }
}
