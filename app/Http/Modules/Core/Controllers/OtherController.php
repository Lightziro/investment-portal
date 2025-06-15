<?php

namespace App\Http\Modules\Core\Controllers;

use App\Domain\Portal\Repository\CompanyRepository;
use App\Domain\Portal\Response\QuoteListResponse;
use App\Domain\Portal\Service\QuoteService;
use App\Domain\Project\Entity\Task;
use App\Http\Classes\StockMarket;
use App\Http\Controllers\Api\Common\Project\Response\ListTaskResponse;
use App\Models\Company\Company;
use App\Models\Other\Country;
use App\Models\Other\EmailSubscription;
use App\Models\User\UsersRole;
use Exception;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use JsonSerializable;
use Throwable;

class OtherController extends Controller
{
    public function getCountries(): JsonResponse
    {
        $countries = Country::orderBy('name')->get()->toArray();
        return response()->json($countries);
    }

    public function getRoles(): JsonResponse
    {
        /** @var UsersRole[]|Collection $roles */
        $roles = UsersRole::query()->get()->toArray();
        return response()->json($roles);
    }

    public function subscribeEmail(Request $request): JsonResponse
    {
        try {
            $post = $request->post();
            if (EmailSubscription::query()->where(['email' => $post['email']])->exists()) {
                throw new Exception('This email address has been signed');
            }
            $subscribe_model = new EmailSubscription(['email' => $post['email']]);
            $subscribe_model->save();
            return response()->json(['status' => true]);
        } catch (Throwable $e) {
            Log::error('test', [$e]);
            return response()->json(['status' => false], 400);
        }
    }

    public function getQuote(QuoteService $quoteService): array|Arrayable|JsonSerializable
    {
        $data = $quoteService->getQuoteList();
        return QuoteListResponse::collection($data);

    }
}
