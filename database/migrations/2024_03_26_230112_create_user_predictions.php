<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPredictions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_predictions', function (Blueprint $table) {
            $table->id('prediction_id');

            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('company_id')->on('companies');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');

            $table->boolean('visible')->default(false)->nullable();
            $table->float('predict_price');

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
        Schema::dropIfExists('user_predictions');
    }
}
