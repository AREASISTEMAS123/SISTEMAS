<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;

class BirthdayController extends Controller
{
    public function getbirthday(){
        return response()->json(Profile::all('birthday'),200);
    }

    public function detailsbirthday(){

        $img =[];
        $user = User::with('Profile')->get();
        foreach ($user as $us){
            $img[]=$us->getMedia('avatars')->first()->getUrl('thumb');

        }

        return response()->json([ 'users' => $user]);
    }

    public function detailsbirthdayMonth($month) {
        $upcomingBirthdays = Profile::whereMonth('birthday', $month)->with('User.media')
            ->orderByRaw('DAY(birthday)')
            ->get();

        return response()->json($upcomingBirthdays, 200);
    }


    public function getUpcomingBirthdaysWithUsers() {
        $currentDate = now();
        $userShift = auth()->user()->Profile->shift; // Obtener el turno del usuario logeado

        $upcomingBirthdays = Profile::whereMonth('birthday', $currentDate->month)
            ->whereDay('birthday', '>=', $currentDate->day)
            ->where('shift', $userShift) // Filtrar por turno
            ->orderByRaw('DAY(birthday)')
            ->with(['User.media'])
            ->get();

        return response()->json($upcomingBirthdays, 200);
    }





}
