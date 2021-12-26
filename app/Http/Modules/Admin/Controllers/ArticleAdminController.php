<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Models\Article\Article;
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
            $validate = Validator::make($request->post(), [
                'title' => ['required', 'max:255'],
                'content' => ['required'],
                'userId' => ['required']
            ]);
            if ($validate->fails()) {
                return response()->json(['message' => 'Incorrectly filled in data'], 400);
            }
            $post = $request->post();
            $article_model = new Article();
            $article_model->title = $post['title'];
            $article_model->content = $post['content'];
            $article_model->author_id = $post['userId'];
            $article_model->save();
            return response()->json(array_merge($article_model->getFrontend(), [
                'content' => $article_model->content
            ]));
        } catch (Throwable $e) {
            return response()->json(['message' => 'Failed to create article'], 400);
        }

    }

    public function updateArticle(Request $request): JsonResponse
    {
        $post = $request->post();
        try {
            /** @var Article $article_model */
            $article_model = Article::query()->where(['article_id' => $post['articleId']])->first();
            if (!$article_model) {
                return response()->json(['message' => 'Could not find an updated article'], 400);
            }
            $article_model->title = $post['title'];
            $article_model->content = $post['content'];
            if (!$article_model->save()) {
                return response()->json(['Failed to update data'], 400);
            }
            return response()->json(array_merge($article_model->getFrontend(), [
                'content' => $article_model->content,
            ]));
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
        foreach ($articles as $article_model) {
            $ar_articles[] = array_merge($article_model->getFrontend(), [
                'content' => $article_model->content
            ]);
        }
        return ['items' => $ar_articles ?? [], 'lastPage' => $articles->lastPage()];
    }

    public function deleteArticle(Request $request)
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
}
