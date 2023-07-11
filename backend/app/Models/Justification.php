<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Justification extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'justification_date',
        'reason',
        'evidence',
        'justification_status',
        'decline',
        'reason_decline'
    ];

    public function User(){
        return $this->hasMany(User::class,'id', 'user_id');
    }
    public function media(){
        return $this->hasMany(Media::class,'model_id', 'user_id');
    }
}
