<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
   
    public $timestamps = false;
    protected $fillable = ['id', 'user_id', 'model_type'];

    
public function user()
    {
        return $this->belongsTo(User::class, 'id_user','id');
    }

}


