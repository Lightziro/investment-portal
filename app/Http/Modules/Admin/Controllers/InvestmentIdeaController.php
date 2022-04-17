<?php


namespace App\Http\Modules\Admin\Controllers;


use App\Models\Investment\InvestmentIdea;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class InvestmentIdeaController extends Controller
{
    public function getItemIdea(InvestmentIdea $idea): JsonResponse
    {
        $idea_company = $idea->company;

        $idea_data = array_merge($idea->only(['idea_id', 'price_buy', 'price_sell', 'description']), [
            'company' => $idea_company->only(['name', 'logo']),
            'views' => $idea->views->count(),
            'comments' => $idea->comments->count(),
            'status' => (string)$idea->status
        ]);

        return response()->json($idea_data);
    }
}
