<?php

namespace App\Http\Modules\User\Controllers;

use App\Http\Resources\UserAuthResource;
use App\Mail\ForgotPassword;
use App\Models\User\User;
use App\Models\User\UserNotices;
use App\Models\User\UserRecovery;
use DefStudio\Telegraph\Facades\Telegraph;
use DefStudio\Telegraph\Models\TelegraphBot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class UserActionController extends Controller
{
    public function recoveryPassword(Request $request): JsonResponse
    {
        $post = $request->post();
        try {
            /** @var UserRecovery|null $recovery_model */
            $recovery_model = UserRecovery::query()->where(['key' => $post['key'], 'accept' => false])
                ->whereBetween('created_at', [now()->subHours(3), now()])->first();
            if (!$recovery_model) {
                return response()->json([], 404);
            }
            $recovery_model->user->password = Hash::make($post['password']);
            $recovery_model->user->save();

            $recovery_model->accept = true;
            $recovery_model->accept_ip = $request->ip();
            $recovery_model->save();
            return response()->json([]);
        } catch (Throwable $e) {
            return response()->json([], 400);
        }
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $post = $request->post();
        /** @var User|null $user */
        $user = User::query()->where(['email' => $post['email']])->first();
        if (!$user) {
            return response()->json(['error' => "Couldn't find user"], 404);
        }
        try {
            $key = md5($user->user_id);
            $recovery_model = new UserRecovery();
            $recovery_model->user_id = $user->user_id;
            $recovery_model->recovery_ip = $request->ip();
            $recovery_model->key = $key;
            $recovery_model->save();

            $message = (new ForgotPassword($recovery_model))->onQueue('emails');
            Mail::to($user->email)->queue($message);
            return response()->json([]);
        } catch (Throwable $e) {
            Log::error($e->getMessage(), [$e]);
            return response()->json([], 400);
        }
    }

    public function authentication(Request $request): UserAuthResource|JsonResponse
    {
        $init = $request->input('initData');
        if (!$this->validateTelegramAuth($init)) {
            return response()->json(['error' => 'not valid request'], 401);
        }
        parse_str($init, $data);
        $userData = json_decode($data['user'], true);
        $userId = $userData['id'];
        Log::error('debugUserId', [$userId]);

        /** @var User|null $user */
        $user = User::query()->where([
            'telegram_id' => $userId,
        ])->first();
        if (!$user || !$user->telegram_id) {
            return response()->json(['error' => 'not found account'], 401);
        }
        $user->password = Hash::make(uniqid());
        $user->save();
        return new UserAuthResource($user);
    }

    private function validateTelegramAuth($initData)
    {
        $bot_token = env('TELEGRAM_BOT_TOKEN');

        $dataCheckArr = explode('&', rawurldecode($initData));
        $needle = 'hash=';
        $checkHash = FALSE;
        foreach ($dataCheckArr as &$val) {
            if (str_starts_with($val, $needle)) {
                $checkHash = substr_replace($val, '', 0, strlen($needle));
                $val = null;
            }
        }

        $dataCheckArr = array_filter($dataCheckArr);
        sort($dataCheckArr);

        $initData = implode("\n", $dataCheckArr);
        $secretKey = hash_hmac('sha256', $bot_token, "WebAppData", true);
        $hash = bin2hex(hash_hmac('sha256', $initData, $secretKey, true));
        Log::error('debugHash', [$hash, $checkHash, hash_equals($hash, $checkHash)]);

        return hash_equals($hash, $checkHash);
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

    public function getLinkUpBalance(Request $request)
    {
        $amount = $request->integer('value');
        /** @var User $user */
        $user = Auth::user();
        $bot = TelegraphBot::fromToken(env('TELEGRAM_BOT_TOKEN'));
        $response = Telegraph::bot($bot)->invoice("Пополнение баланса аккаунта #1")
            ->link()
            ->description('Пополнение баланса')
            ->currency('XTR')
            ->addItem('Пополнение баланса', $amount)
            ->payload($user->user_id)
            ->send();
        return response()->json(['data' => $response->json()]);
    }

    public function getBalance()
    {
        $user = Auth::user();
        return response()->json(['balance' => $user->balance]);
    }
}
