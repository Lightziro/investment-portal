<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPassword;
use App\Models\User;
use App\Models\User\UserRecovery;
use App\Models\UsersRole;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class AuthController extends BaseController
{
    public function login(Request $request): JsonResponse
    {
        $remember = $request->get('remember');
        $messages = [
            'min' => ':attribute поле должно содержать минимум :min символов',
            'max' => ':attribute поле должно содержать минимум :max символов',
        ];

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8|max:40',
        ], $messages);
        if ($validator->fails()) {
            return response()->json($validator->errors()->all(), 400);
        }
        /** @var User $user */
        $user = User::query()->where('email', $request->get('email'))->first();
        if (!$user) {
            return response()->json(['error' => 'The user does not exist'], 400);
        }
        if (!Hash::check($request->get('password'), $user->password)) {
            return response()->json(['error' => 'Password is incorrect'], 400);
        }
        $token = $user->remember_token;
        $cookie = \cookie('token', $token, $remember ? 24 * 60 : 60);
        return response()->json($user->getFrontendData())->cookie($cookie);
    }


    public function authentication(): JsonResponse
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return response()->json(['error' => 'Отсутствует токен, авторизуйтесь'], 400);
        }
        $user = User::query()->where('remember_token', $cookie['token'])->first();
        if (!$user) {
            return response()->json(['error' => 'Не удалось аутентифицировать пользователя'], 400);
        }
        return response()->json($user->getFrontendData());
    }

    public function register(Request $request): RedirectResponse|JsonResponse
    {
        try {
            $fields = $request->all();
            $validator = Validator::make($fields, [
                'firstName' => 'required|min:2|max:25',
                'lastName' => 'required|min:2|max:25',
                'password' => 'required|min:8|max:40',
                'email' => 'required|email',
                'consent' => 'boolean|accepted',
            ]);
            if ($validator->fails()) {
                return redirect()->to('/', 400);
            }
            $user_search = User::query()->where(['email' => $fields['email']])->first();
            if ($user_search) {
                return response()->json(['error' => 'User with such an email address exists'], 400);
            }
            $token = hash('sha256', Str::random(80));

            /** @var User $role_user */
            $role_user = UsersRole::query()->where(['name' => 'user'])->first();
            $user = new User();
            $user->first_name = $fields['firstName'];
            $user->last_name = $fields['lastName'];
            $user->password = Hash::make($fields['password']);
            $user->email = $fields['email'];
            $user->role_id = $role_user->role_id;
            $user->remember_token = $token;
            if ($user->save()) {
                $cookie = \cookie('token', $token, 1234);
                return response()->json($user->getFrontendData())->cookie($cookie);
            }
        } catch (Throwable $exception) {
            return response()->json(['error' => 'Server error'], 400);
        }
        return redirect()->to('/', 400);
    }

    public function exitUser(): JsonResponse|Redirector|RedirectResponse|Application
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return response()->json(['error' => 'Отсутствует токен, авторизуйтесь'], 400);
        }
        return response()->json(['status' => true])->withCookie(Cookie::forget('token'));
    }

    public function authGitHub()
    {
        $user = Socialite::driver('github')->stateless()->user();
    }

    public function redirectToGithub(): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        return Socialite::driver('github')->stateless()->redirect();
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $post = $request->post();
        /** @var User $user */
        if (!$user = User::query()->where(['email' => $post['email']])->first()) {
            return response()->json(['message' => "Couldn't find a user with this email address"], 400);
        }
//        $key = Hash::make($user->user_id);
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
}
