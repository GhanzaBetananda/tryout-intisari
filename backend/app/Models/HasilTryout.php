<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HasilTryout extends Model
{
    protected $table="hasil_tryout";

protected $fillable=[

'user_id',

'jenis_tryout',

'total_nilai',

'durasi'

];

public function detail()
{
    return $this->hasMany(HasilDetail::class);
}
}
