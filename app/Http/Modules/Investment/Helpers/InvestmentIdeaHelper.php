<?php

namespace App\Http\Modules\Investment\Helpers;

use Illuminate\Support\Facades\Log;

class InvestmentIdeaHelper
{
    public static function filterDeletedUser(array $ar_data): array
    {
        return array_values(array_filter($ar_data, fn($entity) => !empty($entity['author'])));
    }
}
