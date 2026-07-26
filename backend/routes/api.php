<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HasilTryoutController;
use App\Http\Controllers\AkunController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PesertaController;


Route::prefix('akun')->group(function () {
    Route::get('/', [AkunController::class, 'index']);
    Route::post('/', [AkunController::class, 'store']);
    Route::get('/{id}', [AkunController::class, 'show']);
    Route::put('/{id}', [AkunController::class, 'update']);
    Route::delete('/{id}', [AkunController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/hasil-tryout',[HasilTryoutController::class,'store']);


Route::get('/peserta/riwayat', [PesertaController::class, 'index']);