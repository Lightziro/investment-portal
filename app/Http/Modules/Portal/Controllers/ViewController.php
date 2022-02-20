<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\Other\Company;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class ViewController extends Controller
{
    public function getViewArticle(Article $article): JsonResponse
    {
        return response()->json($article->toArray());
    }

    public function getViewProfile(User $user): JsonResponse
    {
        return response()->json($user->getProfile());
    }

    public function getViewIdea(InvestmentIdea $idea): JsonResponse
    {
        $author_ideas = InvestmentIdea::query()->where(['author_id' => $idea->author_id]);

        $author_data = array_merge($idea->author->toArray(), [
            'amount_success_ideas' => $author_ideas->with('status', fn($query) => $query
                ->where(['status' => InvestmentIdeaStatuses::STATUS_PUBLISHED]))->count(),
            'amount_fail_ideas' => $author_ideas->with('status', fn($query) => $query
                ->where(['status' => InvestmentIdeaStatuses::STATUS_FAILED]))->count(),
            'total_ideas' => $author_ideas->count()
        ]);
        $company_info = array_merge($idea->toArray(), [
            'company' => $idea->company->toArray(),
            'author' => $author_data
        ]);
        return response()->json($company_info);
    }

    public function getViewCompany(Company $company): JsonResponse
    {
        return response()->json($company->toArray());
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }
}
