<?php

namespace App\Http\Controllers;

use App\Models\Akun;
use App\Models\HasilTryout;
use Illuminate\Http\Request;

class PesertaController extends Controller
{
    /**
     * Data profil akun + riwayat tryout milik akun tertentu.
     */
    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:akun,id',
        ]);

        $akun = Akun::select('id', 'username', 'email', 'no_hp', 'role', 'created_at')
            ->findOrFail($request->user_id);

        $riwayat = HasilTryout::with('detail')
            ->where('user_id', $request->user_id)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($tryout) {
                return [
                    'id'           => $tryout->id,
                    'jenis_tryout' => $tryout->jenis_tryout,
                    'total_nilai'  => $tryout->total_nilai,
                    'durasi'       => $tryout->durasi,
                    'tanggal'      => $tryout->created_at->format('d M Y, H:i'),
                    'detail'       => $tryout->detail->map(function ($d) {
                        return [
                            'kategori' => $d->kategori,
                            'benar'    => $d->benar,
                            'salah'    => $d->salah,
                            'terjawab' => $d->terjawab,
                            'nilai'    => $d->nilai,
                        ];
                    }),
                ];
            });

        return response()->json([
            'akun' => [
                'id'       => $akun->id,
                'username' => $akun->username,
                'email'    => $akun->email,
                'no_hp'    => $akun->no_hp,
                'role'     => $akun->role,
                'sejak'    => $akun->created_at->format('d M Y'),
            ],
            'riwayat' => $riwayat,
        ]);
    }
}