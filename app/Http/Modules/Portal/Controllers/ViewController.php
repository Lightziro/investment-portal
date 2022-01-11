<?php

namespace App\Http\Modules\Portal\Controllers;

use App\Models\Article\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ViewController extends Controller
{
    public function getViewArticle(int $id): JsonResponse
    {
        /** @var Article $article_model */
        $article_model = Article::query()->where(['article_id' => $id])->first();
        if (!$article_model) {
            return response()->json(['message' => 'Not found article'], 400);
        }
        $data = $article_model->getView();

        return response()->json($data);
    }
}
