<?php


namespace App\Http\Modules\Admin\Controllers;


use App\Exceptions\AdminException;
use App\Http\Classes\StockMarket;
use App\Http\Modules\Article\Helpers\ArticleHelper;
use App\Mail\CreateArticle;
use App\Models\Article\Article;
use App\Models\Company\Company;
use App\Models\Other\EmailSubscription;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Throwable;

class CompanyAdminController extends Controller
{
    private const COMPANY_PAGE_SIZE = 10;

    public function getCompaniesByPage(int $page): JsonResponse
    {
        Paginator::currentPageResolver(fn() => $page);
        $companies = Company::query()->paginate(self::COMPANY_PAGE_SIZE);

        return response()->json(['items' => $companies->items() ?? [], 'lastPage' => $companies->lastPage()]);
    }

    public function createCompany(Request $request)
    {
        try {
            $ticker = $request->get('ticker');
            if (Company::query()->where('ticker', $ticker)->exists()) {
                throw new AdminException("Компания с тикером $ticker уже существует");
            }
            $company = new Company();
            $company->fill($request->only(['name', 'ticker', 'show_top']));
            $this->fillCompany($company);
            $company->save();

            return response()->json([]);
        } catch (AdminException $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        } catch (Throwable $e) {
            Log::error('Create company', [$e]);
            return response()->json([], 400);
        }
    }

    public function updateCompany(Company $company, Request $request)
    {
        try {
            $company->fill($request->only(['name', 'ticker', 'show_top']));
            $this->fillCompany($company);
            if ($company->isDirty('show_top')) {
                Cache::forget('quote');
            }
            $company->save();

            return response()->json([]);
        } catch (Throwable $e) {
            Log::error('Update company', [$e]);
            return response()->json([], 400);
        } catch (AdminException $e) {

        }
    }

    public function getItem(Company $company)
    {
        return response()->json($company->toArray());
    }

    private function fillCompany(Company $company)
    {
        $market = new StockMarket();
        $quote_info = $market->getCompanyProfile($company->ticker);
        if (empty(data_get($quote_info, 'name'))) {
            throw new AdminException("Не удалось найти компанию с тикетом: $company->ticker");
        }
        if (request()->boolean('autoFill')) {
            $company->name = data_get($quote_info, 'name');
            $company->date_ipo = data_get($quote_info, 'ipo');
            $company->ticker = data_get($quote_info, 'ticker');
            $company->currency = data_get($quote_info, 'currency');
        }
    }
}
