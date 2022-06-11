<?php

namespace App\Mail;

use App\Models\Article\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CreateArticle extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;
    protected Article $article;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): static
    {
        return $this->view('email.new_article')->with([
            'article' => $this->article,
        ])->subject("Новая статья '{$this->article->title}'");
    }
}
