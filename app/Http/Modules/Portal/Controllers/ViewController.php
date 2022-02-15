<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Article\Article;
use App\Models\Article\ArticleComments;
use App\Models\Investment\InvestmentIdea;
use App\Models\User\User;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Throwable;

class ViewController extends Controller
{
    public function getViewArticle(int $id): JsonResponse
    {
        try {
            /** @var Article $article_model */
            $article_model = Article::query()->with('author')->findOrFail($id);

            $comments = $article_model->comments()->orderByDesc('created_at')->get()->toArray();

            $ar_data = array_merge($article_model->toArray(), [
                'comments' => $comments ?? [],
                'labels' => $article_model->getLabels()
            ]);

            return response()->json($ar_data);
        } catch (Throwable $e) {
            return response()->json([], 404);
        }
    }

    public function getViewProfile(User $user): JsonResponse
    {
        return response()->json($user->getProfile());
    }

    public function getViewIdea(InvestmentIdea $idea): JsonResponse
    {
        $market = new StockMarket();
        $idea_company_model = $idea->company;
        if ($ar_data = $this->getCacheIdeaData($idea->idea_id, $idea_company_model->ticker)) {
            return response()->json($ar_data);
        }

        $quote_info = $market->getLastQuote($idea_company_model->ticker);

        $ar_data = [
            'idea_id' => $idea->idea_id,
            'companyInfo' => [
                'companyName' => $idea_company_model->name,
                'ticker' => $idea_company_model->ticker,
                'logoPath' => $idea_company_model->logo,
                'dateIPO' => $idea_company_model->date_ipo,
                'industry' => $idea_company_model->industry_work,
                'lastQuote' => $quote_info->getC() ?? null,
                'percentChangeToday' => $quote_info->getDp() ?? null,
                'changeToday' => $quote_info->getD(),
            ],
            'authorInfo' => $idea->getFrontendAuthor(),
            'ideaInfo' => [
                'isShort' => $idea->is_short,
                'priceBuy' => $idea->price_buy,
                'priceSell' => $idea->price_sell,
                'dateStart' => $idea->created_at,
                'dateEnd' => $idea->date_end,
            ],
            'description' => $idea->description,
        ];
//        Cache::put("$idea_model->idea_id-$idea_company_model->ticker", $ar_data, now()->addMinutes(3));
        return response()->json($ar_data);
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }
}
