<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UsersRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends BaseController
{
    public function login(Request $request): JsonResponse
    {
        $messages = [
            'min' => ':attribute поле должно содержать минимум :min символов',
            'max' => ':attribute поле должно содержать минимум :max символов',
        ];

        $validator = Validator::make($request->all(), [
            'userName' => 'required|min:4|max:20',
            'password' => 'required|min:8|max:40',
        ], $messages);
        if ($validator->fails()) {
            return response()->json($validator->errors()->all(), 400);
        }
        $user = User::query()->where('userName', $request->get('userName'))->first();
        if ($user->count() !== 1) {
            return response()->json(['Не удалось найти пользователя']);
        }
        if (!Hash::check($request->get('password'), $user->password)) {
            return response()->json(['Пароль указан не верно'], 400);
        }
        if (!$user->authentication($request->all())) {
        }
        $token = $user->remember_token;
        $cookie = \cookie('token', $token, 1234);
        return response()->json($user->getFrontendData())->cookie($cookie);
    }


    public function authentication(): JsonResponse
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return response()->json(['error' => 'Отсутствует токен, авторизуйтесь'], 400);
        }
        $user = User::query()->where('remember_token', $cookie['token'])->first();
        if ($user->count() !== 1) {
            return response()->json(['error' => 'Не удалось аутентифицировать пользователя'], 400);
        }
        return response()->json($user->getFrontendData());
    }

    public function register(Request $request): RedirectResponse|JsonResponse
    {
        try {
            $fields = $request->all();
            $validator = Validator::make($fields, [
                'firstName' => 'required|min:4|max:20',
                'lastName' => 'required|min:8|max:40',
                'password' => 'required|min:8|max:40',
                'email' => 'required|email',
                'consent' => 'boolean|accepted',
            ]);
            if ($validator->fails()) {
                return redirect()->to('/', 400);
            }
            $user_search = User::query()->where(['email' => $fields['email']])->first();
            if ($user_search->count() > 0) {
                return response()->json(['error' => ['User with such an email address exists']], 400);
            }
            $role_user = UsersRole::query()->where(['name' => 'user'])->first();
            $user = new User();
            $user->first_name = $fields['firstName'];
            $user->last_name = $fields['lastName'];
            $user->password = Hash::make($fields['password']);
            $user->email = $fields['email'];
            $user->role_id = $role_user->role_id;
            if($user->save()) {
                return response()->json($user->getFrontendData());
            }
        } catch (\Throwable $exception) {
            return response()->json([], 400);
        }
        return redirect()->to('/', 400);
    }
}
