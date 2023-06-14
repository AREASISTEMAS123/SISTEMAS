<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use \stdClass;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'required|string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
            ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->username) ,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Bearer',]);

    }

    public function login(Request $request){
        if (!Auth::attempt($request->only('username', 'password'))){
            return response()->json(['message' => 'No autorizado'], 401);
        } elseif (auth()->user()->status == 0){
            return response()->json(['message' => 'Tu cuenta ha sido bloqueado, contacte a un administrador'], 401);
        }

        $user = User::where('username', $request['username'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'Hi'.$user->name,
            'accessToken' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(){
        auth()->user()->tokens()->delete();

        return ['message'=> 'Cerraste Sesion con exito'];
    }

}
