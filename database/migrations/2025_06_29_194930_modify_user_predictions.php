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
        if (Schema::hasTable('user_predictions')) {
            Schema::drop('user_predictions');
        }
        Schema::create('user_predictions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('company_id')->constrained('companies', 'company_id')->cascadeOnDelete();
            $table->foreignId('transfer_id')->constrained('user_balance_transfers', 'id')->cascadeOnDelete();
            $table->float('price');
            $table->boolean('is_top');
            $table->integer('amount');
            $table->timestamp('end_at')->nullable();
            $table->timestamps();
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
