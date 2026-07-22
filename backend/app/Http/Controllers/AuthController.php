<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Akun;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $akun = Akun::where('email', $request->email)->first();

        if (!$akun) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan'
            ], 401);
        }

        // Cek password secara langsung (plain text) - TANPA HASH
        if ($request->password !== $akun->password) {
            return response()->json([
                'success' => false,
                'message' => 'Password salah'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'id' => $akun->id,
                'username' => $akun->username, // Ganti 'nama' menjadi 'username' sesuai tabel
                'email' => $akun->email,
                'role' => $akun->role,
                'no_hp' => $akun->no_hp
            ]
        ]);
    }
}