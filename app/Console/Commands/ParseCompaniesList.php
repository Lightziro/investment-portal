<?php

namespace App\Console\Commands;

use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use League\Csv\Reader;
use SplFileObject;
use Throwable;

class ParseCompaniesList extends Command
{
    protected $signature = 'parse-companies-list';

    public function handle(): int
    {
        $reader = Reader::createFromPath('resources/data/companies-list.csv', 'r');
        $reader->setHeaderOffset(0);
        $records = $reader->getRecords();

        $counter = 0;
        $market = new StockMarket();

        foreach ($records as $line) {
            dd($line);
            if ($counter % 60 === 0) {
                sleep(40);
            }
            try {
                $companyInfo = $market->getCompanyProfile($companyModel->ticker);
                $counter++;
                $logoPath = $companyInfo->getLogo();
                $companyModel = Company::query()->firstOrNew([
                    'ticket' => $line['symbol'],
                ]);

                if ($logoPath) {
                    $contents = file_get_contents($logoPath);
                    $infoFile = pathinfo($logoPath);
                    $fileName = "$companyModel->ticker.{$infoFile['extension']}";
                    Storage::disk('public')->put("companies-logo/$fileName", $contents);
                    $companyModel->logo_path = "companies-logo/$fileName";
                }
            } catch (Throwable $e) {
                continue;
            } finally {
                $companyModel->save();
            }
        }
        return 1;
    }
}
