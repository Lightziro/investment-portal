<?php

namespace App\Http\Modules\Article\Controllers;

use App\Models\Article\Article;
use App\Models\Article\ArticleComments;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Throwable;

class ArticleActionsController extends Controller
{
    public function createComment(Request $request): JsonResponse
    {
        try {
            $post = $request->post();
            if (!is_numeric($post['articleId'])) {
                return response()->json(['message' => 'No correct articleId'], 400);
            }
            /** @var Article $article_model */
            $article_model = Article::query()->where(['article_id' => $post['articleId']])->first();
            if (!$article_model) {
                return response()->json(['message' => 'Not found article'], 400);
            }
            $comment = new ArticleComments();
            $comment->text = $post['comment'];
            $comment->user_id = $post['userId'];
            $comment->article_id = $post['articleId'];
            $comment->save();
            return response()->json($comment->getFrontendComment());

        } catch (Throwable $e) {
            Log::error('Try error create comment', [$e->getMessage(), $e->getFile(), $e->getLine(), $post ?? null]);
            return response()->json(['message' => 'Error'], 400);
        }

    }
}
