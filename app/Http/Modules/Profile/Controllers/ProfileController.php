<?php

namespace App\Http\Modules\Profile\Controllers;

use App\Http\Modules\Profile\Helpers\ProfileHelper;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Throwable;

class ProfileController extends Controller
{

    public function updateProfileData(Request $request): JsonResponse
    {
        $form_data = $request->post();
        try {
            /** @var User $user_model */
            $user_model = User::query()->where(['user_id' => $form_data['userId']])->first();
            if (!$user_model) {
                return response()->json(['message' => 'Not found user'], 400);
            }
            ProfileHelper::replaceUpdateField($user_model, $form_data);
            $user_model->save();
            return response()->json($user_model->getProfile());
        } catch (Throwable $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

}
