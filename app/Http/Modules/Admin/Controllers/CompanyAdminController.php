<?php


namespace App\Http\Modules\Admin\Controllers;


use App\Models\Article\Article;
use App\Models\Other\Company;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;

class CompanyAdminController extends Controller
{
    private const COMPANY_PAGE_SIZE = 10;

    public function getCompaniesByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        $companies = Company::query()->paginate(self::COMPANY_PAGE_SIZE);
        /** @var Company $company_model */
        foreach ($companies as $company_model) {
            $activity = $company_model->activity;
            $ar_companies[] = array_merge($company_model->only(['company_id', 'name', 'ticker', 'date_ipo', 'logo']), [
                'activity' => $activity->name ?? '',
            ]);
        }
        return response()->json(['items' => $ar_companies ?? [], 'lastPage' => $companies->lastPage()]);
    }
}
