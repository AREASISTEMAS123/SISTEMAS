<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autoevaluation extends Model
{
    use HasFactory;

    protected $fillable =[
        'evaluation_id',
        'evaluator_id',
        'note1',
        'note2' ,
        'note3',
        'note4',
        'prom_end',
    ];

    public function Evaluation(){
        return $this->hasMany(Evaluation::class, 'id', 'evaluation_id');
    }
}
