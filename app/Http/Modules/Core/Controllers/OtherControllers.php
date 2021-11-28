<?php

namespace App\Http\Modules\Core\Controllers;

use App\Models\Other\Country;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class OtherControllers extends Controller
{
    public function getCountries(): JsonResponse
    {
        $countries = Country::orderBy('name')->get()->toArray();
        return response()->json($countries);
    }
}
