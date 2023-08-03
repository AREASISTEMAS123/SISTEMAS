<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceReport extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendances',
        'delays',
        'absences',
        'justifications',
        'total',
        'shift',
        'date',
    ];
public function user()
{
    return $this->belongsTo(User::class);
}
}
