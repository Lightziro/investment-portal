<?php

namespace App\Http\Modules\User\Controllers;

use App\Mail\ForgotPassword;
use App\Models\User\User;
use App\Models\User\UserNotices;
use App\Models\User\UserRecovery;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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

    public function forgotPassword(Request $request): JsonResponse
    {
        $post = $request->post();
        /** @var User $user */
        if (!$user = User::query()->where(['email' => $post['email']])->first()) {
            return response()->json(['message' => "Couldn't find a user with this email address"], 400);
        }
        $key = md5($user->user_id);
        $recovery_model = new UserRecovery();
        $recovery_model->user_id = $user->user_id;
        $recovery_model->recovery_ip = $_SERVER['REMOTE_ADDR'];
        $recovery_model->key = $key;

        try {
            $error_message = 'Error occurred, try again later';
            if ($recovery_model->save()) {
                Mail::to($user->email)->send(new ForgotPassword($recovery_model));
                return response()->json(['message' => 'A confirmation message has been sent to your email']);
            }
        } catch (Throwable $e) {
            $error_message = 'A confirmation message has been sent to your email';
        }
        return response()->json(['message' => $error_message], 400);
    }

    public function authentication(Request $request): JsonResponse
    {
        /** @var User $user */
        if ($user = Auth::user()) {
            return response()->json($user->getFrontendData());
        }
        return response()->json([], 400);
    }

    public function viewNotice(Request $request): JsonResponse
    {
        $notice_id = $request->all()['id'];
        /** @var UserNotices $notice_model */
        $notice_model = UserNotices::query()->find($notice_id);
        if (!$notice_model) {
            return response()->json(['message' => 'Not found notice'], 404);
        }
        $notice_model->viewed = true;
        $notice_model->save();
        return response()->json([]);
    }
}
