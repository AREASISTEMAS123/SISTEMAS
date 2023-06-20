<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function getattendance(){
        return response()->json(Attendance::all(),200);
    }

    
}
