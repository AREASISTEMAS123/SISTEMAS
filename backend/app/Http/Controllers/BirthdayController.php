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
}
