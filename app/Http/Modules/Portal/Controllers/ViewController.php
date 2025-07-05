<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Domain\Portal\Service\QuoteService;
use App\Models\Article\Article;
use App\Models\Company\Company;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class ViewController extends Controller
{
    public function getViewArticle(Article $article, Request $request): JsonResponse
    {
        return response()->json($article->load([
            'comments' => function ($query) {
                $query->orderByDesc('created_at');
        }])->toArray());
    }

    public function getViewProfile(User $user): JsonResponse
    {
        return response()->json($user->getProfile());
    }

    public function getViewIdea(InvestmentIdea $idea): JsonResponse
    {
        $ideas = $idea->author->investmentIdeas();
        $querySuccess = clone $ideas;
        $queryFail = clone $ideas;

        $authorData = array_merge($idea->author->toArray(), [
            'amount_success_ideas' => $querySuccess->where('status', InvestmentIdeaStatuses::STATUS_SUCCESSFULLY)->count(),
            'amount_fail_ideas' => $queryFail->where('status', InvestmentIdeaStatuses::STATUS_FAILED)->count(),
            'total_ideas' => $ideas->count()
        ]);
        $companyInfo = array_merge($idea->toArray(), [
            'company' => $idea->company->toArray(),
            'author' => $authorData
        ]);
        return response()->json($companyInfo);
    }

    public function getViewCompany(Company $company, QuoteService $service): JsonResponse
    {
        $companyInfo = $company->toArray();
        $quote = $service->getQuoteInfo($company);
        $companyInfo = array_merge($companyInfo, [
            'last_price' => $quote->getLastPrice(),
            'change_percent_today' => $quote->getPercentChangeToday(),
        ]);

        return response()->json($companyInfo);
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }
}
