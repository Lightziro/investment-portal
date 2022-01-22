<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Modules\Admin\Helpers\ArticleHelper;
use App\Models\Article\Article;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use JetBrains\PhpStorm\ArrayShape;
use Throwable;

class ArticleAdminController extends Controller
{
    private const ARTICLE_PAGE_SIZE = 3;

    public function createArticle(Request $request): JsonResponse
    {
        try {
            if (!$this->validateRequest($request)) {
                return response()->json(['message' => 'Incorrectly filled in data'], 400);
            }
            /** @var User $author */
            $author = $request->user();
            $preview_path = $request->file('preview')->store('article-preview', 'public');

            $post = $request->post();
            $article_model = new Article();
            $article_model->title = $post['title'];
            $article_model->content = $post['content'];
            $article_model->author_id = $author->user_id;
            $article_model->preview_path = $preview_path;
            $article_model->save();

            return response()->json(['status' => true]);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Failed to create article'], 400);
        }

    }

    public function updateArticle(Request $request): JsonResponse
    {
        try {
            if (!$this->validateRequest($request)) {
                return response()->json(['message' => 'Incorrectly filled in data'], 400);
            }
            $post = $request->post();
            /** @var Article $article_model */
            if (!$article_model = Article::query()->find($post['articleId'])) {
                return response()->json(['message' => 'Could not find an updated article'], 400);
            }

            ArticleHelper::replaceUpdateField($article_model, $request->all());
            $article_model->save();
            if ($post['sendNotice']) {
                ArticleHelper::sendNotices($article_model, 'update');
            }
            return response()->json(['status' => true]);
        } catch (Throwable $e) {
            Log::error('Error when updating article', [$e->getMessage(), $e->getFile(), $e->getLine()]);
            return response()->json(['message' => 'Error update'], 400);
        }
    }

    public function getArticlesByPage(int $page): JsonResponse
    {
        return response()->json($this->articleListByPage($page));
    }

    #[ArrayShape(['items' => "array", 'lastPage' => "int"])] private function articleListByPage(int $page): array
    {
        Paginator::currentPageResolver(fn() => $page);
        $articles = Article::query()->paginate(self::ARTICLE_PAGE_SIZE);
        /** @var Article $article_model */
        foreach ($articles as $article_model) {
            $author_model = $article_model->author;
            $ar_articles[] = array_merge($article_model->only(['article_id', 'content', 'title']), [
                'author' => [
                    'full_name' => (string)$author_model,
                    'avatar_path' => $author_model->avatar_path
                ],
                'created_at' => $article_model->created_at->format('Y-m-d'),
            ]);
        }
        return ['items' => $ar_articles ?? [], 'lastPage' => $articles->lastPage()];
    }

    public function deleteArticle(Request $request): JsonResponse
    {
        try {
            $post = $request->post();
            Paginator::currentPageResolver(fn() => $post['page']);
            $article = Article::query()->where(['article_id' => $post['articleId']])->first();
            if ($article && $article->delete()) {
                return response()->json($this->articleListByPage($request['page']));
            }
        } catch (Throwable $e) {
            return response()->json(['message' => 'Not success'], 400);
        }
    }

    public function getItemArticle(int $id): JsonResponse
    {
        /** @var Article $article */
        if ($article = Article::query()->find($id)) {
            return response()->json([
                'articleId' => $article->article_id,
                'title' => (string)$article,
                'preview' => $article->preview_path,
                'content' => $article->content,
            ]);
        }
    }

    private function validateRequest(Request $request): bool
    {
        $validate = Validator::make($request->all(), [
            'title' => ['required', 'max:255'],
            'content' => ['required'],
            'preview' => ['required', 'image', 'mimes:jpeg,png,jpg']
        ]);
        return $validate->fails();
    }
}
