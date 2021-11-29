<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Models\Article\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ArticleAdminController extends Controller
{
    private const ARTICLE_PAGE_SIZE = 3;

    public function createArticle(Request $request)
    {
        $test = '';
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
        } catch (Throwable $e) {
            return response()->json(['message' => 'Failed to create article'], 400);
        }

    }

    public function getArticlesByPage($page): JsonResponse
    {
        $articles = Article::query()->paginate(self::ARTICLE_PAGE_SIZE, ['*'], '', $page);
        /** @var Article $article_model */
        foreach ($articles as $article_model) {
            $ar_articles[] = [
                'articleId' => $article_model->article_id,
                'title' => $article_model->title,
            ];
        }
        return response()->json([
            'items' => $ar_articles ?? [],
            'lastPage' => $articles->lastPage(),
        ]);
    }
}
