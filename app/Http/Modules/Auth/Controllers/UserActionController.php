<?php

namespace App\Http\Modules\Auth\Controllers;

use App\Models\User\UserRecovery;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;
use Throwable;

class UserActionController extends Controller
{
    public function recoveryPassword(Request $request): JsonResponse
    {
        $post = $request->post();
        $now = Carbon::now();
        $error_message = 'Error occurred, try again later';
        try {
            /** @var UserRecovery $recovery_model */
            $recovery_model = UserRecovery::query()->where(['key' => $post['key'], 'accept' => false])
                ->whereBetween('created_at', [Carbon::now()->subHours(3), $now])->first();
            if ($recovery_model) {
                $recovery_model->user->password = Hash::make($post['password']);
                $recovery_model->user->save();

                $recovery_model->accept = true;
                $recovery_model->accept_ip = $_SERVER['REMOTE_ADDR'];
                $recovery_model->save();
                return response()->json(['message' => 'You successfully changed your password']);
            }
        } catch (Throwable $e) {

        }
        return response()->json(['message' => $error_message], 400);
    }
}
