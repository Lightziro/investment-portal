<?php

namespace App\Http\Modules\Auth\Controllers;

use App\Models\User\User;
use App\Models\User\UsersRole;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;
use function cookie;

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
            return response()->json(['error' => 'Attemp'], 400);
        }
        return response()->json($user->getFrontendData());
//        return response()->json($user->getFrontendData());
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
                $cookie = cookie('token', $token, 1234);
                return response()->json($user->getFrontendData())->cookie($cookie);
            }
        } catch (Throwable $e) {
            Log::error('Register user error', [$e->getMessage(), $e->getFile(), $e->getLine()]);
            return response()->json(['error' => 'Server error'], 400);
        }
        return redirect()->to('/', 400);
    }

    /** Авторизация через github(Not release)
     * @return void
     */
    public function authGitHub()
    {
        $user = Socialite::driver('github')->stateless()->user();
    }

    public function redirectToGithub(): \Symfony\Component\HttpFoundation\RedirectResponse
    {
        return Socialite::driver('github')->stateless()->redirect();
    }

    public function getUser(Request $request): JsonResponse
    {
        /** @var User $user */
        if ($user = $request->user()) {
            return response()->json($user->getFrontendData());
        }
        return response()->json([], 400);
    }
    public function logout(): JsonResponse
    {
        if (Auth::check()) {
            Auth::logout();
            return response()->json([]);
        }
        return response()->json(['status' => false], 400);
    }
}
