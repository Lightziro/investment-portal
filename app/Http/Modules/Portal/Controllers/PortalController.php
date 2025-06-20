<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Domain\Portal\Repository\InvestmentIdeaRepository;
use App\Domain\Portal\Response\NewsListResponse;
use App\Domain\Portal\Service\NewsService;
use App\Http\Classes\StockMarket;
use App\Http\Modules\Article\Helpers\ArticleHelper;
use App\Models\Article\Article;
use App\Models\Company\Company;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class PortalController extends BaseController
{
    private const TYPE_ENTITY_COMPANIES = 'Companies';
    private const TYPE_ENTITY_ARTICLES = 'Articles';
    private const TYPE_ENTITY_PROFILES = 'Profiles';


    public function getPortalData(): JsonResponse
    {
        $repository = new InvestmentIdeaRepository();
        $countSuccess = $repository->getCountByStatus(InvestmentIdeaStatuses::STATUS_SUCCESSFULLY);
        $countFail = $repository->getCountByStatus(InvestmentIdeaStatuses::STATUS_FAILED);

        $articles_popular = Article::mostPopular()->limit(3)->with('author')->get()->toArray();
        $articles_popular = ArticleHelper::filterDeletedAuthors($articles_popular);
        $pk_list = array_column($articles_popular, 'article_id');
//
        $articles_simple = Article::query()->whereNotIn('article_id', $pk_list)
            ->orderByDesc('created_at')
            ->limit(5)->with('author')->get()->toArray();
        $articles_simple = ArticleHelper::filterDeletedAuthors($articles_simple);

        $investment_ideas = InvestmentIdea::mostPopular()->limit(5)->get();
        /** @var InvestmentIdea $idea_model */
        foreach ($investment_ideas as $idea_model) {
            $company_info = $idea_model->company;
            $ar_ideas[] = [
                'id' => $idea_model->getKey(),
                'possibleProfit' => $idea_model->possible_profit,
                'stock' => $company_info->name,
                'logo' => $company_info->logo_path,
            ];
        }

        return response()->json([
            'stats' => [
                'success' => $countSuccess,
                'fail' => $countFail,
            ],
            'ideas' => $ar_ideas ?? [],
            'articles' => [
                'popular' => $articles_popular ?? null,
                'simple' => $articles_simple ?? null
            ]
        ]);
    }

    public function getNews(NewsService $newsService): AnonymousResourceCollection
    {
        return NewsListResponse::collection($newsService->getList());
    }

    public function searchData(string $search): JsonResponse
    {
        $ar_query = [
            self::TYPE_ENTITY_COMPANIES => Company::query()->where('name', 'LIKE', "%{$search}%")->limit(5),
            self::TYPE_ENTITY_ARTICLES => Article::query()->where('title', 'LIKE', "%{$search}%")->limit(5),
            self::TYPE_ENTITY_PROFILES => User::query()->where('first_name', 'LIKE', "%{$search}%")
                ->orWhere('last_name', 'LIKE', "%{$search}%")->limit(5)
        ];
        foreach ($ar_query as $entity_name => $query) {
            $ar_search[] = ['entity' => $entity_name, 'items' => $this->convertToSearchFormat($query, $entity_name)];
        }
        return response()->json($ar_search);
    }

    private function convertToSearchFormat(Builder $query, $entity): array
    {
        $data = $query->get()->all();
        switch ($entity) {
            case self::TYPE_ENTITY_COMPANIES:
                return array_map(fn(Company $item) => [
                    'entity_id' => $item->company_id,
                    'name' => $item->name,
                    'img_path' => $item
                ], $data);
            case self::TYPE_ENTITY_PROFILES:
                return array_map(fn(User $item) => [
                    'entity_id' => $item->user_id,
                    'name' => (string)$item,
                    'img_path' => $item->avatar_path,
                ], $data);
            case self::TYPE_ENTITY_ARTICLES:
                return array_map(fn(Article $item) => [
                    'entity_id' => $item->article_id,
                    'name' => $item->title,
                    'img_path' => $item->preview_path,
                ], $data);
            default:
                return [];
        }
    }
}
