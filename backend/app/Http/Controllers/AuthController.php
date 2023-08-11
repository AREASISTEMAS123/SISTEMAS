<?php

namespace App\Http\Controllers;


use App\Models\Model_has_role;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Profile;
use \stdClass;
use Symfony\Component\Console\Input\Input;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'string|min:8',
            'profile_name' => 'required|string|max:255',
            'dni' => 'required|string|max:8|unique:profiles',
            'department' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'shift' => 'required|string|max:255',
            'birthday' => 'date',
            'date_start' => 'required|date',
            'date_end' => 'required|date',
            'cellphone' => 'string',
            'responsible' => 'string|max:255',
            'avatar' => 'required|mimes:jpg,jpeg,png'
            ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $user = User::create([
            'username' => $request->dni,
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->dni) ,

        ]);

        $profile = Profile::create([
            'user_id' => $user->id,
            'profile_name'=> $request->profile_name,
            'dni'=> $request->dni,
            'department'=> $request->department,
            'area'=> $request->area,
            'shift'=> $request->shift,
            'cellphone' =>$request->cellphone,
            'birthday' => $request->birthday,
            'date_start' => $request->date_start,
            'date_end' => $request->date_end,
            'responsible' => $request->responsible,
        ]);

        $user->addMediaFromRequest('avatar')->toMediaCollection('avatars');

        event(new Registered($user));
        return response()->json(['usuario' => $user, 'perfil' => $profile]);

    }

    public function login(Request $request){
        $rules = array(
            'username' => 'required|string',
            'password' => 'required|string',
        //   'g-recaptcha-response' => 'required|captcha',
        );
        $messages = array(
            'username.required' => 'Por favor ingrese el usuario',
             'password.required' => 'Por favor ingrese la contraseña',
        /*    'g-recaptcha-response' => [
              'required' => 'Please verify that you are not a robot.',
               'captcha' => 'Captcha error! try again later or contact site admin.',]*/
            );

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()){
            $messages=$validator->messages();
            return response()->json(["messages"=>$messages],500);
        }


        if (!Auth::attempt($request->only('username', 'password' ))){
            return response()->json(['message' => 'No autorizado'], 401);
        } elseif (auth()->user()->status == 0){
            return response()->json(['message' => 'Tu cuenta ha sido bloqueado, contacte a un administrador'], 401);
        }



        $user = User::where('username', $request['username'])->firstOrFail();
        $profile = Profile::where('dni',$request['username'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        $role = Model_has_role::where('model_id', Auth::user()->id)->firstOrFail();
        $img = Auth::user()->getMedia('avatars')->first()->getUrl('thumb');

        if($role->role_id == '1'){
            $name_role = 'Gerencia';
            return response()->json([
                'message' => 'Hola '.$user->name,
                'accessToken' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'profile' => $profile,
                'rol' => $name_role,
                'avatar' =>$img
            ]);
        } elseif($role->role_id == '2'){
            $name_role = 'Lider Nucleo';
            return response()->json([
                'message' => 'Hola '.$user->name,
                'accessToken' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'profile' => $profile,
                'rol' => $name_role,
                'avatar' =>$img
            ]);
        }else{
            $name_role = 'Colaborador';
            return response()->json([
                'message' => 'Hola '.$user->name,
                'accessToken' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'profile' => $profile,
                'rol' => $name_role,
                'avatar' =>$img
            ]);
        }


    }

    public function logout(){
        auth()->user()->tokens()->delete();

        return ['message'=> 'Cerraste Sesion con exito'];
    }

}
