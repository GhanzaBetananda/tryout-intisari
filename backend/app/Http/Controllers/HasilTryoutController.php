<?php

namespace App\Http\Controllers;

use App\Models\HasilTryout;
use App\Models\HasilDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HasilTryoutController extends Controller
{

    public function store(Request $request)
    {

        DB::beginTransaction();

        try{

            $hasil=HasilTryout::create([

                'user_id'=>$request->user_id,

                'jenis_tryout'=>$request->jenis_tryout,

                'total_nilai'=>$request->total_nilai,

                'durasi'=>$request->durasi

            ]);

            foreach($request->detail as $item){

                HasilDetail::create([

                    'hasil_tryout_id'=>$hasil->id,

                    'kategori'=>$item['kategori'],

                    'benar'=>$item['benar'],

                    'salah'=>$item['salah'],

                    'terjawab'=>$item['terjawab'],

                    'nilai'=>$item['nilai']

                ]);

            }

            DB::commit();

            return response()->json([

                "status"=>true,

                "message"=>"Berhasil",

                "data"=>$hasil

            ]);

        }catch(\Exception $e){

            DB::rollBack();

            return response()->json([

                "status"=>false,

                "message"=>$e->getMessage()

            ],500);

        }

    }

}
