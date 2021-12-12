<?php

namespace App\Http\Modules\Core\Controllers;

use App\Models\Other\Country;
use App\Models\Other\EmailSubscription;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Throwable;

class OtherController extends Controller
{
    public function getCountries(): JsonResponse
    {
        $countries = Country::orderBy('name')->get()->toArray();
        return response()->json($countries);
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
}
