<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use App\Models\Investment\InvestmentIdeaViewing;
use App\Models\Other\Company;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cookie;

class InvestmentDataController extends Controller
{
    private const IDEAS_PAGE_SIZE = 5;

    public function getInvestmentData(): Application|RedirectResponse|Redirector|JsonResponse
    {
        $cookie = Cookie::get();
        if (empty($cookie['token'])) {
            return redirect('/');
        }
        $ar_response['viewToday'] = InvestmentIdeaViewing::query()->whereDate('created_at', Carbon::today())->count() ?? null;
        $ar_response['commentsToday'] = InvestmentIdeaComments::query()->whereDate('created_at', Carbon::today())->count() ?? null;
        return response()->json($ar_response);
    }

    public function getIdeasByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        /** @var InvestmentIdea[]|LengthAwarePaginator $ideas */
        $ideas = InvestmentIdea::query()->paginate(self::IDEAS_PAGE_SIZE);
        foreach ($ideas as $idea_model) {
            $ar_items[] = array_merge($idea_model->getFrontendData(), []);
//            $ar_articles[] = array_merge($idea_model->getFrontend(), [
//                'content' => $article_model->content
//            ]);
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
}
