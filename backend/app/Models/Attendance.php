<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'admission_time',
        'departure_time',
        'image',
        'attendance',
        'absence',
        'justification',
        'delay',
        'non_working_days',
        'date'
    ];

    // public function user(){
    //     return $this->hasMany(User::class,'id','user_id');
    // }

    public function profile(){
        return $this->hasMany(Profile::class,'user_id','user_id');
    }
}
