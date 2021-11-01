<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
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
}
