<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable =[
        'user_id',
        'profile_name',
        'dni',
        'department' ,
        'area',
        'shift',
        'birthday',
        'date_start',
    ];
}
