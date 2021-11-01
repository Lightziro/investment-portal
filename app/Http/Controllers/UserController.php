<?php

namespace App\Http\Controllers;

use App\Models\User\UserNotices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class UserController extends BaseController
{
    public function viewNotice(Request $request): JsonResponse
    {
        $notice_model = UserNotices::query()->find($request->all()['id']);
        if ($notice_model instanceof UserNotices) {
            $notice_model->viewed = true;
            if ($notice_model->save()) {
                return response()->json(['updated' => true]);
            }
        }
        return response()->json(['updated' => false], 400);
    }
}
