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

    public function insertAttendance(Request $request) {
        
        #$user_id = auth()->id();

        #$validacion = Attendance::find($user_id);

        $validacion = 0;

        if ($validacion != 0) {

            #LOGICA DE UPDATE DATA (DEPARTURE_TIME & DEPARTURE_IMAGE)

        } else {
            
            #ES UN MARCADO DE ENTRADA
            
            $attendance = new Attendance();

            $attendance->date = $request->input('date');
            $attendance->admission_time = $request->input('admission_time');
            $attendance->user_id = auth()->id();
            $attendance->attendance = 1;

            if ($request->hasFile("admission_image")) {
                $file = $request->file("admission_image");
                $attendance->admission_image = $file->getClientOriginalName();
            }

            $attendance->save();
            return response()->json(['attendance' => $attendance]);
        }
    }
}
