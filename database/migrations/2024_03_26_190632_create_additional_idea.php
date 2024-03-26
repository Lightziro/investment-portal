<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdditionalIdea extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('investment_idea_ratings', function (Blueprint $table) {
            $table->id('rating_id');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');

            $table->unsignedBigInteger('idea_id');
            $table->foreign('idea_id')->references('idea_id')->on('investment_ideas');

            $table->integer('score');
            $table->timestamps();
        });

        Schema::create('investment_idea_viewing', function (Blueprint $table) {
            $table->id('rating_id');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');

            $table->unsignedBigInteger('idea_id');
            $table->foreign('idea_id')->references('idea_id')->on('investment_ideas');
            $table->timestamps();
        });

        Schema::create('investment_idea_comments', function (Blueprint $table) {
            $table->id('comment_id');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');

            $table->unsignedBigInteger('idea_id');
            $table->foreign('idea_id')->references('idea_id')->on('investment_ideas');

            $table->text('comment');
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
        Schema::dropIfExists('investment_idea_ratings');
    }
}
