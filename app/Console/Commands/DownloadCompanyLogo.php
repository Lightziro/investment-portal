<?php

namespace App\Console\Commands;

use App\Http\Classes\StockMarket;
use App\Models\Company\Company;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Throwable;

class DownloadCompanyLogo extends Command
{
    protected $signature = 'download-company-logo';

    public function handle(): int
    {
        $market = new StockMarket();
        $counter = 0;

        /** @var Company $companyModel */
        foreach (Company::all() as $companyModel) {
            $companyModel->logo_path = null;
            if ($counter % 60 === 0) {
                sleep(40);
            }
            try {
                $companyInfo = $market->getCompanyProfile($companyModel->ticker);
                $counter++;
                $logoPath = data_get($companyInfo, 'logo');
                if (!$logoPath) {
                    continue;
                }
                $contents = file_get_contents($logoPath);
                $infoFile = pathinfo($logoPath);

                $fileName = "$companyModel->ticker.{$infoFile['extension']}";
                Storage::disk('public')->put("companies-logo/$fileName", $contents);
                $companyModel->logo_path = "companies-logo/$fileName";
            } catch (Throwable) {
                continue;
            } finally {
                $companyModel->save();
            }
        }
        return 0;
    }
}
