<?php


namespace App\Http\Modules\Core\Controllers;


use App\Models\Article\Article;
use App\Models\Investment\InvestmentIdea;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class InitialDataController extends Controller
{
    public function getIdeasKey(): JsonResponse
    {
        $ideas = InvestmentIdea::mostPopular()->limit(5)->get('idea_id')->toArray();
        return response()->json($ideas);
    }

    public function getArticlesKey(): JsonResponse
    {
        $articles = Article::mostPopular()->limit(3)->get('article_id')->toArray();
        return response()->json($articles);
    }
}
