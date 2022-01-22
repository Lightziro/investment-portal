<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Modules\Profile\Helpers\ProfileHelper;
use App\Models\User\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Throwable;

class UsersAdminController extends Controller
{
    private const USERS_PAGE_SIZE = 5;

    public function getUsersByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        $users = User::query()->paginate(self::USERS_PAGE_SIZE);
        /** @var User $user_model */
        foreach ($users as $user_model) {
            $ar_users[] = array_merge($user_model->only(['user_id', 'sex']), [
                'full_name' => (string)$user_model,
                'country' => $user_model->country ? $user_model->country->name : null,
                'role' => (string)$user_model->role,
                'created_at' => $user_model->created_at->format('Y-m-d'),
                'updated_at' => $user_model->updated_at->format('Y-m-d')
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

    public function updateUser(Request $request): JsonResponse
    {
        $form_data = $request->post();
        try {
            /** @var User $user */
            if (!$user = User::query()->find($form_data['userId'])) {
                return response()->json(['Not found user'], 404);
            }
            ProfileHelper::replaceUpdateField($user, $form_data);
            $user->save();
            return response()->json(['status' => 'success']);
        } catch (Throwable  $e) {

        }
    }
}
