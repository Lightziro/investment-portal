<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvestmentIdeas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('investment_idea_statuses', function (Blueprint $table) {
            $table->id('status_id');
            $table->string('name');
            $table->string('description');
            $table->timestamps();
        });

        Schema::create('investment_ideas', function (Blueprint $table) {
            $table->id('idea_id');
            $table->float('price_buy')->nullable();
            $table->float('price_sell')->nullable();
            $table->float('possible_profit')->nullable();
            $table->boolean('is_short')->nullable();
            $table->date('date_create')->nullable();
            $table->date('date_end')->nullable();
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('company_id')->on('companies');

            $table->unsignedBigInteger('author_id');
            $table->foreign('author_id')->references('user_id')->on('users');

            $table->unsignedBigInteger('status_id');
            $table->foreign('status_id')->references('status_id')->on('investment_idea_statuses');
            $table->text('description')->nullable();
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
        Schema::dropIfExists('investment_ideas');
    }
}
