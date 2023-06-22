<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function getProfile(){
            $profile = Profile::with('User', )->where("id", Auth::user()->id)->get();
            $attendance = Attendance::all()->where('user_id', Auth::user()->id)->where("attendance", "1")->count();
            $absence = Attendance::all()->where('user_id', Auth::user()->id)->where("absence", "1")->count();

            return response()->json([
                "Usuario"=>$profile,
                "Asistencia" => $attendance,
                "Faltas" => $absence]);
    }


}
