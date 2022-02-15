<?php

namespace App\Http\Modules\Article\Controllers;

use App\Models\Article\Article;
use App\Models\Article\ArticleComments;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Throwable;

class ArticleController extends Controller
{
    public function createComment(Request $request): JsonResponse
    {
        try {
            /** @var User $user */
            if (!$user = $request->user()) {
                return response()->json(['message' => 'Not found user session'], 400);
            }
            $post = $request->post();
            $entity_id = $post['entityId'];

            /** @var Article $article_model */
            $article_model = Article::query()->find($entity_id);
            if (!$article_model) {
                return response()->json(['message' => 'Not found article'], 400);
            }
            $comment = new ArticleComments();
            $comment->comment = $post['comment'];
            $comment->user_id = $user->user_id;
            $comment->article_id = $entity_id;
            $comment->save();
            return response()->json(array_merge($comment->toArray(), [
                'user' => $comment->user->toArray()
            ]));

        } catch (Throwable $e) {
            Log::error('Try error create comment', [$e->getMessage(), $e->getFile(), $e->getLine(), $post ?? null]);
            return response()->json(['message' => 'Error'], 400);
        }
    }

    public function getComments(Article $article): JsonResponse
    {
        return response()->json($article->comments()->orderByDesc('created_at')->get()->toArray());
    }

    public function getLabels(Article $article): JsonResponse
    {
        return response()->json($article->getLabels());
    }
}
