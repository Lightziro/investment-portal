<?php

namespace App\Http\Modules\Article\Controllers;

use App\Http\Modules\Article\Helpers\ArticleHelper;
use App\Models\Article\Article;
use App\Models\Article\ArticleComments;
use App\Models\Article\ArticleEmotion;
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

    public function all(string $sort_by = 'article_id'): JsonResponse
    {
        $direction = 'asc';
        $query_articles = Article::query();

        $query_articles->orderBy($sort_by, $direction);

        return response()->json(ArticleHelper::filterDeletedAuthors($query_articles->get()->toArray()));
    }

    public function getEmotions(Article $article): JsonResponse
    {
        return response()->json($article->emotions->toArray());
    }

    public function createEmotion(Article $article, Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $emotion = new ArticleEmotion([
            'user_id' => $user->getKey(),
            'article_id' => $article->getKey(),
            'emotion_code' => $request->get('emotion'),
        ]);
        $emotion->save();

        return response()->json($article->emotions->toArray());
    }
}
