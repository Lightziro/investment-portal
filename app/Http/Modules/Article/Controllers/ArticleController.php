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

class ArticleController extends Controller
{
    public function createComment(Article $article, Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();
        $post = $request->post();

        $comment = new ArticleComments();
        $comment->comment = $post['comment'];
        $comment->user_id = $user->getKey();
        $comment->article_id = $article->getKey();
        $comment->save();

        return response()->json($comment->load('user')->toArray());
    }

    public function getComments(Article $article): JsonResponse
    {
        $comments = $article
            ->comments()
            ->orderByDesc('created_at')
            ->get()->whereNotNull("user")->values();

        return response()->json($comments->toArray());
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

    public function changeEmotion(Article $article, ArticleEmotion $emotion, Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        if ($emotion->user_id !== $user->getKey()) {
            return response()->json(['message' => 'Test'], 403);
        }
        $emotion->emotion_code = $request->get('emotion');
        $emotion->save();

        return response()->json($emotion->toArray());
    }
}
