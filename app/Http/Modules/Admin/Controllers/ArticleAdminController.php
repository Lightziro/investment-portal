<?php

namespace App\Http\Modules\Admin\Controllers;

use App\Http\Modules\Article\Helpers\ArticleHelper;
use App\Mail\CreateArticle;
use App\Models\Article\Article;
use App\Models\Other\EmailSubscription;
use App\Models\User\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use JetBrains\PhpStorm\ArrayShape;
use Throwable;

class ArticleAdminController extends Controller
{
    private const ARTICLE_PAGE_SIZE = 3;

    public function createArticle(Request $request): JsonResponse
    {
        try {
            /** @var User $author */
            $author = $request->user();
            if ($file = $request->file('preview_path')) {
                $preview_path = $file->store('article-preview', 'public');
            }

            $article_model = new Article();
            $article_model->fill($request->only(['title', 'content']));
            $article_model->author_id = $author->getKey();
            $article_model->preview_path = $preview_path ?? null;
            $article_model->save();

            if ($request->boolean('sendNotice')) {

                $message = (new CreateArticle($article_model))
                    ->onQueue('emails');

                /** @var EmailSubscription $subscriber */
                foreach (EmailSubscription::all() as $subscriber) {
                    Mail::to($subscriber->email)->queue($message);
                }
            }
            return response()->json([]);
        } catch (Throwable $e) {
            return response()->json([], 400);
        }
    }

    public function updateArticle(Article $article, Request $request): JsonResponse
    {
        try {
            $post = $request->post();

            if ($file = $request->file('preview_path')) {
                if ($past_preview = $article->preview_path) {
                    Storage::delete($past_preview);
                }
                $preview_path = $file->store('article-preview', 'public');
                $article->preview_path = $preview_path;
            }

            $article->fill($request->only(['content', 'title']));
            $article->save();

            if ($request->boolean('sendNotice')) {
                ArticleHelper::sendNotices($article, 'update');
            }
            return response()->json([]);
        } catch (Throwable $e) {
            return response()->json([], 400);
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

    public function deleteArticle(Article $article, Request $request): JsonResponse
    {
        try {
            $post = $request->post();
            Paginator::currentPageResolver(fn() => $post['page']);
            $article->delete();
        } catch (Throwable) {
            return response()->json(['message' => 'Not success'], 400);
        }
        return response()->json(['message' => 'Response']);
    }

    public function getItemArticle(Article $article): JsonResponse
    {
        return response()->json($article->toArray());
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
