<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;

class UsersAdminController extends Controller
{
    private const USERS_PAGE_SIZE = 5;

    public function getUsersByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        $users = User::query()->paginate(self::USERS_PAGE_SIZE);
        /** @var User $user_model */
        foreach ($users as $user_model) {
            $user_data = $user_model->getProfile();
            $ar_users[] = array_merge($user_data, [
                'roleId' => $user_model->role_id,
            ]);
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

    public function updateUser(Request $request)
    {
        $data = '';
    }
}
