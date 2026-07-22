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
        Schema::create('hasil_tryout', function (Blueprint $table) {

    $table->id();

    $table->foreignId('user_id')
        ->constrained('akun')
        ->cascadeOnDelete();

    $table->string('jenis_tryout');

    $table->integer('total_nilai');

    $table->integer('durasi');

    $table->timestamps();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_tryout');
    }
};
