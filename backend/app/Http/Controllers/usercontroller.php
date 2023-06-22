<?php

namespace App\Http\Controllers;
use App\Models\Profile;
use App\Models\User;
use GuzzleHttp\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class usercontroller extends Controller
{
    public function getUser()
    {
        $profile = Profile::with("User")->get();

        return response()->json( $profile);
    }

    public function getUserById($id)
    {

        $user = Profile::with("User")->where("id",$id)->get();
        if (is_null($user)) {
            return response()->json(['messages' => 'No encontrado'], 404);
        }else{
            return response()->json($user, 200);
        }

    }

    public function deleteUser(Request $request, $id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json(['Mensaje' => 'No encontrado'], 404);
        }
        $user->delete();
        return response()->json(['Mensaje' => 'Eliminado correctamente'], 200);
    }

    public function updateUser(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'username' => 'string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'string|min:8',
            'status' => 'required|boolean',
            'profile_name' => 'required|string|max:255',
            'dni' => 'required|string|max:8',
            'department' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'shift' => 'required|string|max:255',
            'birthday' => 'date',
            'date_start' => 'required|date',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $user = User::find($id);
        $user->update($request->all());

        $profile = Profile::find($id);
        $profile->update($request->all());
        return response()->json(['usuario' => $user, 'perfil' => $profile, 'messages' => "Usuario actualizado con exito"],200);

    }
}


