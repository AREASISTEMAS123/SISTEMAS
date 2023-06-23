<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function getattendance(){
        $attendance_user = Attendance::all();


        return response()->json(['attendance' => $attendance_user]);
    }


}
