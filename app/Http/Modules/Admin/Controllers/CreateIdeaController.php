<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\QueueRabbit;
use App\Http\Classes\StockMarket;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\Other\Company;
use App\Models\User\User;
use DateInterval;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Throwable;

class CreateIdeaController extends Controller
{
    public function analyzeIdea(Request $request): JsonResponse
    {
        $data = $request->post();
        /** @var User $author */
        $author = $request->user();

        try {
            /** @var Company $company_model */
            $company_model = Company::query()->where(['name' => $data['selectedCompany']])->first();
            if (!$company_model) {
                return response()->json(['message' => 'Not found company'], 400);
            }

            $from_time = new DateTime();
            $from_time->sub(new DateInterval("P{$data['monthPeriod']}M"));
            $market = new StockMarket();
            $news_list = $market->getCompanyNews($company_model->ticker, $from_time, new DateTime());
            if (!$news_list) {
                return response()->json(['message' => 'Failed get company news'], 400);
            }
            foreach ($news_list as $item) {
                $ar_news[] = $item['headline'];
            }

            /** @var InvestmentIdeaStatuses $status_created */
            $status_created = InvestmentIdeaStatuses::query()->where(['name' => InvestmentIdeaStatuses::STATUS_CREATED])->first();
            $idea = new InvestmentIdea();
            $idea->company_id = $company_model->company_id;
            $idea->status_id = $status_created->status_id;
            $idea->author_id = $author->user_id;
            $idea->save();

            $queue = new QueueRabbit();
            $params = ['news' => $ar_news ?? [], 'idea_id' => $idea->idea_id];
            $queue->send('analyze-idea', json_encode($params));
            return response()->json([]);
        } catch (Throwable $e) {
            Log::error('Error create idea', [$e->getMessage(), $e->getFile(), $e->getLine()]);
        }
    }
}
