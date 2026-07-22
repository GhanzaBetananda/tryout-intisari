<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Akun extends Model
{
    use HasFactory;

    protected $table = 'akun';

    protected $fillable = [
        'username',
        'email',
        'password',
        'no_hp',
        'role'
    ];

    // protected $hidden = [
    //     'password',
    // ];

    // public function setPasswordAttribute($value)
    // {
    //     $this->attributes['password'] = bcrypt($value);
    // }
}