<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InvestmentIdeaStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('investment_ideas', function (Blueprint $table) {
            $table->dropForeign('investment_ideas_status_id_foreign');
            $table->dropColumn('status_id');
            $table->string('status')->nullable();
        });
        Schema::dropIfExists('investment_idea_statuses');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
