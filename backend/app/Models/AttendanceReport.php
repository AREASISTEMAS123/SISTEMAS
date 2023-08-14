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
/*public function user()
{
    return $this->belongsTo(User::class);
}

public static function averageAttendance()
{
    return self::avg('attendances');
}

public function attendanceRecords()
{
    return $this->hasMany(Attendance::class, 'date', 'date');
}*/

}
