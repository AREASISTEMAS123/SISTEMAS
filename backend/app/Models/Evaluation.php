<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{

    public $timestamps = false;
    protected $fillable = ['id', 'user_id', 'date'];

    public function profile()
    {
        return $this->hasMany(Profile::class, 'id', 'user_id');
    }

    public function softSkills()
    {
        return $this->hasMany(SoftSkills::class, 'evaluation_id', 'id');
    }
    public function leadershipEvaluations()
    {
        return $this->hasMany(LeadershipEvaluation::class, 'evaluation_id', 'id');
    }
    public function autoEvaluation()
    {
        return $this->hasMany(Autoevaluation::class, 'evaluation_id', 'id');
    }
    public function evaluation()
    {
        return $this->hasMany(Evaluation::class, 'evaluation_id', 'id');
    }
    public function performance() {
        return $this->hasMany(Performance::class, 'evaluation_id', 'id');
    }

}