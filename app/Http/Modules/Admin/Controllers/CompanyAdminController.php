<?php


namespace App\Http\Modules\Admin\Controllers;


use App\Models\Company\Company;
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

        return response()->json(['items' => $companies->items() ?? [], 'lastPage' => $companies->lastPage()]);
    }
}
