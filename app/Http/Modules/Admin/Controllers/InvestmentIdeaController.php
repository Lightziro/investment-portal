<?php


namespace App\Http\Modules\Admin\Controllers;


use App\Models\Investment\InvestmentIdea;
use Illuminate\Routing\Controller;

class InvestmentIdeaController extends Controller
{
    public function getItemIdea(int $id)
    {
        /** @var InvestmentIdea $idea */
        if (!$idea = InvestmentIdea::query()->find($id)) {
            return response()->json(['Not found idea'], 404);
        }
        $idea_data = [];
        return response()->json($idea_data);
    }
}
