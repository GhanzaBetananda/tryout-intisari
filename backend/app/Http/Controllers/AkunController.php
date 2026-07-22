<?php

namespace App\Http\Controllers;

use App\Models\Akun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AkunController extends Controller
{
    // GET /api/akun - Menampilkan semua akun
    public function index()
    {
        $akun = Akun::all();
        return response()->json([
            'success' => true,
            'data' => $akun
        ]);
    }

    // POST /api/akun - Menyimpan akun baru
    public function store(Request $request)
{
    $validated = $request->validate([

        'username' => 'required',

        'email' => 'required|email|unique:akun,email',

        'password' => 'required|min:6',

        'no_hp' => 'nullable',

        'role' => 'required'

    ]);

    $akun = Akun::create($validated);

    return response()->json([

        'success' => true,

        'data' => $akun

    ],201);
}

    // GET /api/akun/{id} - Menampilkan detail akun
    public function show($id)
    {
        $akun = Akun::find($id);
        
        if (!$akun) {
            return response()->json([
                'success' => false,
                'message' => 'Akun tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $akun
        ]);
    }

    // PUT /api/akun/{id} - Update akun
    public function update(Request $request, $id)
    {
        $akun = Akun::find($id);
        
        if (!$akun) {
            return response()->json([
                'success' => false,
                'message' => 'Akun tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'username' => 'sometimes|string|max:100',
            'email' => 'sometimes|email|unique:akun,email,' . $id,
            'password' => 'nullable|string|min:6',
            'no_hp' => 'nullable|string|max:20',
            'role' => 'sometimes|in:admin,peserta'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        
        // Hanya update password jika diisi
        if (empty($data['password'])) {
            unset($data['password']);
        }

        $akun->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Akun berhasil diupdate',
            'data' => $akun
        ]);
    }

    // DELETE /api/akun/{id} - Hapus akun
    public function destroy($id)
    {
        $akun = Akun::find($id);
        
        if (!$akun) {
            return response()->json([
                'success' => false,
                'message' => 'Akun tidak ditemukan'
            ], 404);
        }

        $akun->delete();

        return response()->json([
            'success' => true,
            'message' => 'Akun berhasil dihapus'
        ]);
    }
}