<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id('article_id');
            $table->string('title');
            $table->text('content')->nullable();
            $table->string('preview_path')->nullable();
            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')->references('user_id')->on('users');
            $table->timestamps();
        });
        Schema::create('article_comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->references('article_id')->on('articles');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->string('comment')->nullable();
            $table->timestamps();
        });
        Schema::create('article_viewing', function (Blueprint $table) {
            $table->id('viewing_id');
            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->references('article_id')->on('articles');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->timestamps();
        });
        Schema::create('labels', function (Blueprint $table) {
            $table->id('label_id');
            $table->string('code');
            $table->string('icon')->nullable();
            $table->timestamps();
        });
        Schema::create('article_labels', function (Blueprint $table) {
            $table->id('viewing_id');
            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->references('article_id')->on('articles');
            $table->unsignedBigInteger('label_id')->nullable();
            $table->foreign('label_id')->references('label_id')->on('labels');
            $table->string('text')->nullable();
            $table->timestamps();
        });
        Schema::create('article_emotions', function (Blueprint $table) {
            $table->id('emotion_id');
            $table->unsignedBigInteger('article_id');
            $table->foreign('article_id')->references('article_id')->on('articles');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->string('emotion_code')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
}
