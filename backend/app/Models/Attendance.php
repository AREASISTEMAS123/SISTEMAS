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
        'non_working_days'
    ];

    public function profile(){
        return $this->hasMany(Attendance::class, 'id','user_id');
    }
}
