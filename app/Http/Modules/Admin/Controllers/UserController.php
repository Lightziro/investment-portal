<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Request;
use Illuminate\Http\Request as RequestApi;
use Throwable;

class UserController extends Controller
{
    private const USERS_PAGE_SIZE = 5;

    public function getUsersByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        $users = User::query()->with('role')->with('country')->paginate(self::USERS_PAGE_SIZE);
        /** @var User $user_model */
        foreach ($users as $user_model) {
            $ar_users[] = $user_model->toArray();
        }
        return response()->json(['items' => $ar_users ?? [], 'lastPage' => $users->lastPage()]);
    }

    public function getStats(): JsonResponse
    {
        $week_date = Carbon::now()->subDays(7);
        $users_today = User::query()->whereDate('created_at', Carbon::today())->count();
        $users_week = User::query()->whereDate('created_at', '>=', $week_date)->count();
        return response()->json(['newUsersToday' => $users_today, 'newUsersWeek' => $users_week]);
    }

    public function update(User $user, RequestApi $request): JsonResponse
    {
        try {
            $user->updateOrFail($request->toArray());
            return response()->json([]);
        } catch (Throwable  $e) {
            return response()->json([], 400);
        }
    }

    public function get(User $user): JsonResponse
    {
        return response()->json($user->toArray());
    }

    public function delete(User $user): JsonResponse
    {
        try {
            $user->delete();
            return response()->json([]);
        } catch (Throwable) {
            return response()->json([], 400);
        }
    }
}
