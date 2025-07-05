<?php

namespace App\Http\Modules\User\Controllers;

use App\Http\Resources\UserTransactionResource;
use App\Models\User\User;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\Request as RequestApi;
use Throwable;

class UserController extends Controller
{

    public function update(User $user, RequestApi $request): JsonResponse
    {
        $form_data = $request->toArray();
        try {
            $user->updateOrFail($form_data);
            return response()->json($user->getProfile());
        } catch (Throwable $e) {
            Log::error('Error update profile', [$e]);
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

    public function getTransactions(RequestApi $request)
    {
        /** @var User $user */
        $user = $request->user();
        $event = $request->get('event') ?? null;
        $query =  $user->balanceTransfers();
        if (!empty($event)) {
            $query->where('event', $event);
        }
        $list = $query->orderByDesc('created_at')->get();
        return UserTransactionResource::collection($list);
    }
}
