<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{
    use HasFactory;
    protected $fillable =[
      'user_id',
      'tittle',
      'description',
      'limit_date',
    ];

    public function profiles(){
        return $this->hasMany(Profile::class,'user_id', 'id' );
    }
}
