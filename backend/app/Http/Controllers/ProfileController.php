<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Model_has_role;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function getProfile(){
            $profile = Profile::with('User', )->where("id", Auth::user()->id)->get();
            $attendance = Attendance::all()->where('user_id', Auth::user()->id)->where("attendance", "1")->count();
            $absence = Attendance::all()->where('user_id', Auth::user()->id)->where("absence", "1")->count();
            $delay = Attendance::all()->where('user_id', Auth::user()->id)->where("delay", "1")->count();
            $justification = Attendance::all()->where('user_id', Auth::user()->id)->where("justification", "1")->count();
            $role = Model_has_role::where('model_id', Auth::user()->id)->firstOrFail();

        if ($role->role_id == '1'){
            $name_role = 'Gerente';
            return response()->json([
                    "Usuario"=>$profile,
                    "Asistencia" => $attendance,
                    "Faltas" => $absence,
                    "Tardanzas" => $delay,
                    "Justificaciones" => $justification,
                    'rol' => $name_role]);
        }if ($role->role_id == '1'){
            $name_role = 'Gerente';
            return response()->json([
                "Usuario"=>$profile,
                "Asistencia" => $attendance,
                "Faltas" => $absence,
                "Tardanzas" => $delay,
                "Justificaciones" => $justification,
                'rol' => $name_role]);
        }elseif ($role->role_id == '2'){
            $name_role = 'Lider de Departamento';
            return response()->json([
                "Usuario"=>$profile,
                "Asistencia" => $attendance,
                "Faltas" => $absence,
                "Tardanzas" => $delay,
                "Justificaciones" => $justification,
                'rol' => $name_role]);
        }elseif ($role->role_id == '3'){
            $name_role = 'Lider de Area';
            return response()->json([
                "Usuario"=>$profile,
                "Asistencia" => $attendance,
                "Faltas" => $absence,
                "Tardanzas" => $delay,
                "Justificaciones" => $justification,
                'rol' => $name_role]);
        }else {
            $name_role = 'Colaborador';
            return response()->json([
                "Usuario"=>$profile,
                "Asistencia" => $attendance,
                "Faltas" => $absence,
                "Tardanzas" => $delay,
                "Justificaciones" => $justification,
                'rol' => $name_role]);
        }

    }

    public function change_password(Request $request){
        $validator = Validator::make($request->all(),[
            'old_password' =>'required',
            'password' => 'required|min:8|max:100',
            'confirm_password' => 'required|same:password'

        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validaciones fallidas',
                'errors'=>$validator->errors()],422);
        }

        $user = $request->user();
        if(Hash::check($request->old_password, $user->password)){
                $user->update([
                  'password' => Hash::make($request->password)
                ]);
            return response()->json([
                'message' => 'Contraseña cambiado correctamente',
            ],200);
        }else{
            return response()->json([
                'message' => 'La contraseña antigua no es correcta',
              ],400);
        }
    }
}
