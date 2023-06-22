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

        $profile = Profile::with("User:id,name,email,status")->get();

        return response()->json( $profile);
    }
}
