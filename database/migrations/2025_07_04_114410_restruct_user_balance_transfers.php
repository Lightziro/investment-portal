<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_predictions', function (Blueprint $table) {
            $table->float('close_price')->nullable();
            $table->integer('profit_amount')->nullable();
            $table->foreignId('close_transfer_id')->nullable()->constrained('user_balance_transfers', 'id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
