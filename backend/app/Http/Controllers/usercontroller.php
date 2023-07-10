<?php

namespace App\Http\Controllers;
use App\Models\Attendance;
use App\Models\Media;
use App\Models\Model_has_role;
use App\Models\Profile;
use App\Models\User;
use GuzzleHttp\Pool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class usercontroller extends Controller
{
    public function getUser()
    {
        $profile = Profile::with("User","role","media")->get();

        return response()->json([
            'profile' => $profile]);
    }

    public function getUserById($id)
    {

        $user = Profile::with("User")->where("id",$id)->get();
            if (is_null($user)) {
                return response()->json(['messages' => 'No encontrado'], 404);
            }
        $attendance = Attendance::all()->where('user_id', $id)->where("attendance", "1")->count();
        $absence = Attendance::all()->where('user_id', $id)->where("absence", "1")->count();
        $delay = Attendance::all()->where('user_id', $id)->where("delay", "1")->count();
        $justification = Attendance::all()->where('user_id', $id)->where("justification", "1")->count();
        $role = Model_has_role::where('model_id', $id)->firstOrFail();
        $img = User::with('media')->where('id', $id)->first()->getMedia('avatars');

        if ($role->role_id == '1'){
            $name_role = 'Gerencia';

            return response()->json([
                "usuario" =>$user,
                "Asistencia" => $attendance,
                "Faltas" => $absence,
                "Tardanzas" => $delay,
                "Justificaciones" => $justification,
                'rol' => $name_role,
                'avatar' => $img], 200);
        }elseif ($role->role_id == '2'){
        $name_role = 'Lider Departamento';

        return response()->json([
            "usuario" =>$user,
            "Asistencia" => $attendance,
            "Faltas" => $absence,
            "Tardanzas" => $delay,
            "Justificaciones" => $justification,
            'rol' => $name_role,
            'avatar' => $img], 200);
        }elseif ($role->role_id == '3'){
        $name_role = 'Lider Area';

        return response()->json([
            "usuario" =>$user,
            "Asistencia" => $attendance,
            "Faltas" => $absence,
            "Tardanzas" => $delay,
            "Justificaciones" => $justification,
            'rol' => $name_role,
            'avatar' => $img], 200);
         }else{
        $name_role = 'Colaborador';

        return response()->json([
            "usuario" =>$user,
            "Asistencia" => $attendance,
            "Faltas" => $absence,
            "Tardanzas" => $delay,
            "Justificaciones" => $justification,
            'rol' => $name_role,
            'avatar' => $img], 200);
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
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'status' => 'required|boolean',
            'dni' => 'required|string',
            'profile_name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'shift' => 'required|string|max:255',
            'birthday' => 'date',
            'date_start' => 'required|date',
            'responsible' => 'required|string|max:255',
            'role_id' => 'required',
           // 'avatar' => 'required|mimes:jpg,jpeg,png',

        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }



        $user = User::find($id);
        $user->update([
            'username' => $request->dni,
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->dni)
        ]);

        $profile = Profile::find($id);
        $profile->update($request->all());

        $role = Model_has_role::where('model_id',$id);
        $role->update(['role_id' => $request->role_id]);


       /* $file = $request->file('avatar');
        $img = Media::where('model_id', $id)->get();
        $img->update($request->all());
        if ($request->hasFile('avatar')){
            $img->clearMediaCollection('avatars');
            $img->addMedia($file)->toMediaCollection('avatars');
        }*/

            return response()->json([
                'usuario' => $user,
                'perfil' => $profile,
                'rol' => $role->get(),
                'messages' => "Usuario actualizado con exito"],200);
    }
}


