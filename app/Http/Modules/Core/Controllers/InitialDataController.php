<?php


namespace App\Http\Modules\Core\Controllers;


use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use App\Models\Investment\InvestmentIdeaStatuses;
use App\Models\User\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class InitialDataController extends Controller
{
    public function getPortalInit(Request $request): JsonResponse
    {
    }
}
