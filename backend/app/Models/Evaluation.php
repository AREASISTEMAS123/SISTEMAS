<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
   
    public $timestamps = false;
    protected $fillable = ['id', 'user_id', 'date'];

    public function profile() {
        return $this->hasMany(Profile::class,'id', 'user_id');
    }

}


