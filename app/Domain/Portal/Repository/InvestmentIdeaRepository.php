<?php

namespace App\Domain\Portal\Repository;

use App\Common\Abstract\Repository;
use App\Models\Company\Company;
use App\Models\Investment\InvestmentIdea;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class InvestmentIdeaRepository extends Repository
{
    protected string|Model $model = InvestmentIdea::class;

    public function getCountByStatus(string $status): int
    {
        return $this->model::query()->where('status', $status)->count();
    }
}
