<?php

namespace App\Domain\Portal\Response\Transformer;

use App\Domain\Project\DataTransferObject\Common\ProjectRouteStagesStateData;
use App\Domain\Project\Entity\Approval;
use App\Domain\Project\Entity\Project;
use App\Domain\Project\Service\ProjectFavoriteService;
use App\Domain\User\Entity\User;
use App\Domain\User\Service\RoleService;
use App\Http\Controllers\Api\Common\Project\Response\ProjectResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Collection;

class QuoteResponseTransformer
{

    public function transform(Collection $quotes): AnonymousResourceCollection
    {
        $responses = collect();

        foreach ($quotes as $project) {
            $response = new ProjectResponse($project);
            $responses->push($response);
        }

        return ProjectResponse::collection($responses);
    }
}
