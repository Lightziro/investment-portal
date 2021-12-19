<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Classes\QueueRabbit;
use App\Http\Classes\SmartAnalytic;
use App\Http\Classes\StockMarket;
use App\Models\Other\Company;
use DateInterval;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Throwable;

class CreateIdeaController extends Controller
{
    private const LABELS_KEY = [
        'positive' => 0,
        'negative' => 1,
        'neutral' => 2,
    ];
    public function predictNews(Request $request)
    {
        try {
            /** @var Company $company_model */
            $company_model = Company::query()->where(['name' => $request->post()['name']])->first();
            $market = new StockMarket();
            $from_time = new DateTime();
            $from_time->sub(new DateInterval('P3M'));
            $news = $market->getCompanyNews($company_model->ticker, $from_time, new DateTime());
            foreach ($news as $news_item) {
                $ar_news[] = $news_item['headline'];
            }
            $queue = new QueueRabbit();
//            $queue->send('predict-news', json_encode($));
            $smart_analytic = new SmartAnalytic();
            $ar_predict = $smart_analytic->classificationNews($ar_news ?? []);
            $news_info = ['positive' => 0, 'negative' => 0];
            foreach ($ar_predict as $predict) {
                $key_number = self::LABELS_KEY[$predict['predict']];
                $probability = $predict['probability'][$key_number];
                if ($predict['predict'] !== 'neutral' && (float)$probability > 0.8) {
                    $news_info[$predict['predict']]++;
                }
            }
            $test = '';
        } catch (Throwable $e) {

        }

    }
}
