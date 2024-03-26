<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\QueueRabbit;
use App\Http\Classes\StockMarket;
use App\Mail\CreateIdea;
use App\Models\Company\Company;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\Other\EmailSubscription;
use App\Models\User\User;
use DateInterval;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use PhpAmqpLib\Exception\AMQPIOException;
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
            $idea->company_id = $company_model->getKey();
            $idea->status_id = $status_created->getKey();
            $idea->author_id = $author->getKey();
            $idea->save();
            try {
                $queue = new QueueRabbit();
                $params = ['news' => $ar_news ?? [], 'idea_id' => $idea->idea_id];
                $queue->send('analyze-idea', json_encode($params));
            } catch (AMQPIOException $e) {
                Log::error('Error send to rabbit', [$e->getMessage(), $e->getFile(), $e->getLine()]);
            }
            return response()->json([]);
        } catch (Throwable $e) {
            Log::error('Error create idea', [$e]);
            return response()->json([], 400);
        }
    }

    public function publishIdea(InvestmentIdea $idea, Request $request): JsonResponse
    {
        try {
            /** @var InvestmentIdeaStatuses $status */
            $status = InvestmentIdeaStatuses::query()->firstWhere(['name' => InvestmentIdeaStatuses::STATUS_PUBLISHED]);
            $idea->update(array_merge($request->only([
                'price_buy',
                'price_sell',
                'date_end',
                'is_short',
                'description'
            ]), [
                'status_id' => $status->status_id,
            ]));

            $idea->possible_profit = $idea->calculatePossibleProfit();
            $idea->save();

            if ($request->boolean('send_email')) {
                $message = (new CreateIdea($idea))
                    ->onQueue('emails');

                foreach (EmailSubscription::all() as $subscriber) {
                    Mail::to($subscriber->email)->queue($message);
                }
            }
            return response()->json([]);
        } catch (Throwable $e) {
            Log::error('Error publish idea', [$e]);
            return response()->json([], 400);
        }
    }
}
