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
        'cellphone',
        'date_end',
        'responsible',
    ];

    public function User(){
        return $this->hasMany(User::class, 'id', 'user_id');
    }
    public function media(){
        return $this->hasOne(Media::class,'model_id', 'id');
    }
    public function tasks(){
        return $this->hasMany(UserTask::class, 'user_id', 'id');
    }
    public function role(){
        return $this->hasMany(Model_has_role::class, 'model_id','id');
    }
}
