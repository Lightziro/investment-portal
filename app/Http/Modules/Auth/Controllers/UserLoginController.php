<?php

namespace App\Http\Modules\Auth\Controllers;

use App\Models\User\User;
use App\Models\User\UsersRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;

class UserLoginController extends Controller
{
    public function login(Request $request): JsonResponse
    {
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
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json([], 400);
        }
        return response()->json($user->getFrontendData());
    }

    public function register(Request $request): JsonResponse
    {
        try {
            $fields = $request->all();
            $validator = Validator::make($fields, [
                'first_name' => 'required|min:2|max:25',
                'last_name' => 'required|min:2|max:25',
                'password' => 'required|min:8|max:40',
                'email' => 'required|email',
                'consent' => 'boolean|accepted',
            ]);
            if ($validator->fails()) {
                return response()->json([], 400);
            }
            $user_search = User::query()->where(['email' => $fields['email']])->first();
            if ($user_search) {
                return response()->json(['error' => 'User with such an email address exists'], 400);
            }
            /** @var User $role_user */
            $role_user = UsersRole::query()->where(['name' => 'user'])->first();
            $fields['password'] = Hash::make($fields['password']);
            $user = new User($fields);
            $user->role_id = $role_user->role_id;
            $user->saveOrFail();
            return response()->json([]);
        } catch (Throwable $e) {
            Log::error('Register user error', [$e->getMessage(), $e->getFile(), $e->getLine()]);
            return response()->json([], 400);
        }
    }

    public function logout(): JsonResponse
    {
        if (Auth::check()) {
            Auth::logout();
            return response()->json([]);
        }
        return response()->json([], 400);
    }
}
