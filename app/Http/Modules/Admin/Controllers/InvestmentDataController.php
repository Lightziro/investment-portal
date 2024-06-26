<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Models\Company\Company;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaViewing;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Redirector;

class InvestmentDataController extends Controller
{
    private const IDEAS_PAGE_SIZE = 5;

    public function getInvestmentData(): Application|RedirectResponse|Redirector|JsonResponse
    {
        $ar_response['viewToday'] = InvestmentIdeaViewing::query()->whereDate('created_at',
                Carbon::today())->count() ?? null;
        $ar_response['commentsToday'] = InvestmentIdeaComments::query()->whereDate('created_at',
                Carbon::today())->count() ?? null;
        return response()->json($ar_response);
    }

    public function getIdeasByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        $ideas = InvestmentIdea::query()->with(['author', 'company'])->paginate(self::IDEAS_PAGE_SIZE);
        /** @var InvestmentIdea $idea_model */
        foreach ($ideas as $idea_model) {
            $idea_company = $idea_model->company;
            $ar_items[] = array_merge($idea_model->only(['idea_id']), [
                'company' => $idea_company->only(['name', 'logo']),
                'views' => $idea_model->views->count(),
                'comments' => $idea_model->comments->count(),
                'status' => (string)$idea_model->status,
                'score' => $idea_model->getScoreAnalyze(),
            ]);
        }
        return response()->json(['items' => $ar_items ?? [], 'lastPage' => $ideas->lastPage()]);
    }

    public function getCompanies(string $query): JsonResponse
    {
        $companies = Company::query()->where('name', 'LIKE', "%{$query}%");
        if ($companies->count() > 0) { // Поиск по базе
            /** @var Company $company */
            foreach ($companies->limit(5)->get() as $company) {
                $ar_company[] = (string)$company;
            }
        }
        return response()->json($ar_company ?? []);
    }

    public function getStats(): JsonResponse
    {
        $week_date = Carbon::now()->subDays(7);

        $response = [
            'ideas_create_today' => InvestmentIdea::query()->whereDate('created_at', Carbon::today())->count(),
            'ideas_create_week' => InvestmentIdea::query()->whereDate('created_at', '>=', $week_date)->count(),
            'ideas_view_today' => InvestmentIdeaViewing::query()->whereDate('created_at', Carbon::today())->count(),
            'ideas_view_week' => InvestmentIdeaViewing::query()->whereDate('created_at', '>=', $week_date)->count(),
        ];

        return response()->json($response);
    }
}
