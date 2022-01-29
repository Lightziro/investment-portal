<?php

namespace App\Http\Modules\Profile\Controllers;

use App\Http\Modules\Profile\Helpers\ProfileHelper;
use App\Models\User\User;
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
            if (!$user_model = $request->user()) {
                return response()->json(['Not found user'], 404);
            }
            $user_model->update($form_data);
            return response()->json($user_model->getProfile());
        } catch (Throwable $e) {
            // TODO: УБРАТЬ ВЫВОД ОШИБОК
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

}
