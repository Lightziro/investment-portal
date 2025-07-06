<?php

namespace App\Domain\Portal\Repository;

use App\Common\Abstract\Repository;
use App\Models\Company\Company;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CompanyRepository extends Repository
{
    protected string|Model $model = Company::class;

    public function getTopList(): Collection|array
    {
        return $this->model::query()->where('show_top', true)->limit(6)
            ->orderBy('name')->get(['name', 'ticker', 'company_id', 'logo_path', 'type_market_parse', 'external_id']);
    }
}
