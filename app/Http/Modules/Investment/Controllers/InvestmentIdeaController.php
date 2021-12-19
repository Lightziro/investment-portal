<?php

namespace App\Http\Modules\Investment\Controllers;

use App\Http\Classes\StockMarket;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaComments;
use Finnhub\Model\BasicFinancials;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class InvestmentIdeaController extends Controller
{
    public function createComment(Request $request): JsonResponse
    {
        $commentData = $request->post();
        $user_id = $commentData['userId'];
        if (!isset($commentData['ideaId'], $commentData['text']) || !is_numeric($request->post()['ideaId'])) {
            return response()->json(['message' => 'No correct request data'], 400);
        }
        $comment = new InvestmentIdeaComments();
        $comment->comment = $commentData['text'];
        $comment->user_id = $user_id;
        $comment->idea_id = $commentData['ideaId'];
        $comment->save();
        return response()->json($comment->getFrontendComment());
    }

    public function getCacheIdeaData(int $idea_id, string $ticker)
    {
        return Cache::get("$idea_id-$ticker");
    }

    public function getInvestmentIdeaData(int $id): JsonResponse
    {
        /** @var InvestmentIdea $idea_model */
        $idea_model = InvestmentIdea::query()->find($id);
        $market = new StockMarket();
        $idea_company_model = $idea_model->company;
        if ($ar_data = $this->getCacheIdeaData($idea_model->idea_id, $idea_company_model->ticker)) {
            return response()->json($ar_data);
        }

        $quote_info = $market->getLastQuote($idea_company_model->ticker);
        $author_model = $idea_model->author;
        $company_stats = $market->getFinancialsStats($idea_company_model->ticker);

        if ($company_stats instanceof BasicFinancials) {
            foreach ($company_stats->getSeries()['annual']->eps as $eps_year_stats) {
                $ar_eps[] = [
                    'date' => $eps_year_stats->period,
                    'value' => round($eps_year_stats->v, 2),
                ];
            }
            if (!empty($ar_eps)) {
                $ar_eps = array_reverse($ar_eps);
            }
        }
        $analytics_stats = $market->getRecommendationAnalytics($idea_company_model->ticker);
        if (is_array($analytics_stats)) {
            foreach ($analytics_stats as $stats) {
                $ar_stats[] = [
                    'buy' => $stats['buy'],
                    'period' => $stats['period'],
                    'sell' => $stats['sell'],
                    'hold' => $stats['hold']
                ];
            }
        }
        $ar_data = [
            'ideaId' => $idea_model->idea_id,
            'epsStats' => $ar_eps ?? [],
            'analyticsStats' => $ar_stats ?? [],
            'comments' => $idea_model->getCommentsFrontend(),
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
            'authorInfo' => [
                'userId' => $author_model->user_id,
                'avatar' => $author_model->avatar_path,
                'totalIdeas' => $author_model->investment_ideas->count(),
                'amountSuccessfulIdeas' => $author_model->investment_ideas->where('status', InvestmentIdea::STATUS_SUCCESS)->count(),
                'amountFailIdeas' => $author_model->investment_ideas->where('status', InvestmentIdea::STATUS_FAIL)->count(),
                'fullName' => $author_model->getFullName(),
            ],
            'ideaInfo' => [
                'isShort' => $idea_model->is_short,
                'priceBuy' => $idea_model->price_buy,
                'priceSell' => $idea_model->price_sell,
                'dateStart' => $idea_model->date_create,
                'dateEnd' => $idea_model->date_end,
            ],
            'description' => $idea_model->description
        ];
//        Cache::put("$idea_model->idea_id-$idea_company_model->ticker", $ar_data, now()->addMinutes(3));
        return response()->json($ar_data);
    }
}
