<?php

namespace App\Console\Commands;

use App\Exceptions\ConsumerException;
use App\Http\Classes\QueueRabbit;
use App\Http\Modules\Admin\Helpers\AnalyticsHelper;
use App\Models\Investment\AnalyticalQuestion;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaAnalyze;
use App\Models\Investment\InvestmentIdeaStatuses;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use PhpAmqpLib\Message\AMQPMessage;
use Throwable;

class PredictIdeaCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:predict-ideas';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $queue = new QueueRabbit();
        $queue->consume('predict-idea', [$this, 'consumer']);
        return 1;
    }

    /**
     * @param AMQPMessage $message
     */
    public function consumer(AMQPMessage $message)
    {
        try {
            if ($message->body && $data = json_decode($message->body, true, 512, JSON_THROW_ON_ERROR)) {
                /** @var InvestmentIdea $idea_model */
                $idea_model = InvestmentIdea::query()->find($data['idea_id']);
                if (!$idea_model) {
                    throw new ConsumerException("Not found idea by id {$data['idea_id']}");
                }
                /** @var InvestmentIdeaStatuses $status_model */
                $status_model = InvestmentIdeaStatuses::query()->where(['name' => InvestmentIdeaStatuses::STATUS_ANALYZED])->first();
                $analytic_helper = new AnalyticsHelper($idea_model);
                $analytic_helper->prepareNews($data['news_predict']);
                /** @var AnalyticalQuestion $question */
                foreach (AnalyticalQuestion::all() as $question) {
                    $method = "analytic$question";
                    $result = 0;
                    if (method_exists($analytic_helper, $method)) {
                        $result = $analytic_helper->$method();
                    }

                    $analyze_model = InvestmentIdeaAnalyze::query()->updateOrCreate([
                        'question_id' => $question->question_id,
                        'idea_id' => $idea_model->idea_id
                    ], [
                        'result' => (int)$result
                    ]);
                }
                $idea_model->status_id = $status_model->status_id;
                $idea_model->save();
            }
        } catch (Throwable $e) {
            Log::error('Predict idea consumer error', [$e->getMessage(), $e->getFile(), $e->getLine()]);
        }
    }
}
