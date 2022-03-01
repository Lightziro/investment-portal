<?php

namespace App\Http\Modules\User\Controllers;

use App\Models\User\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\Request as RequestApi;
use Throwable;

class UserController extends Controller
{

    public function update(User $user): JsonResponse
    {
        $form_data = Request::toArray();
        try {
            $user->updateOrFail($form_data);
            return response()->json($user->getProfile());
        } catch (Throwable $e) {
            return response()->json([], 400);
        }
    }

    public function getUser(RequestApi $request): JsonResponse
    {
        /** @var User $user */
        if ($user = $request->user()) {
            return response()->json($user->getFrontendData());
        }
        return response()->json([], 400);
    }

    public function getNotices(RequestApi $request): JsonResponse
    {
        /** @var User $user */
        if ($user = $request->user()) {
            return response()->json($user->notices->toArray());
        }
        return response()->json([], 400);
    }
}
