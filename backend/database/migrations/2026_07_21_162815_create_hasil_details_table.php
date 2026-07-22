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
        Schema::create('hasil_detail', function (Blueprint $table) {

            $table->id();

            $table->foreignId('hasil_tryout_id')
                ->constrained('hasil_tryout')
                ->cascadeOnDelete();

            $table->string('kategori');

            $table->integer('benar')->nullable();

            $table->integer('salah')->nullable();

            $table->integer('terjawab')->nullable();

            $table->integer('nilai');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_details');
    }
};
