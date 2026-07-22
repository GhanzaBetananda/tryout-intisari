<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HasilDetail extends Model
{
    protected $table="hasil_detail";

protected $fillable=[

'hasil_tryout_id',

'kategori',

'benar',

'salah',

'terjawab',

'nilai'

];

public function hasil()
{
    return $this->belongsTo(HasilTryout::class);
}
}
