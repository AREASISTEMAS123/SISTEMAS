<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class usercontroller extends Controller
{
    public function getUser()
    {
        return response()->json(User::all(), 200);
    }

    public function getUserById($id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json(['Mensaje' => 'No encontrado'], 404);
        }
        return response()->json($user, 200);
    }

    public function insertUser(Request $request)
    {
        $user = User::create($request->all());
        return response($user, 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        if (is_null($user)) {
            return response()->json(['Mensaje' => 'No encontrado'], 404);
        }
        $user->update($request->all());
        return response($user, 200);
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


    //Api para consultar el perfil
    public function getProfileData(Request $request)
    {
        // Obtener el ID del usuario actual
        $userId = $request->user()->id;

        // Buscar el perfil asociado al usuario
        $profile = Profile::where('user_id', $userId)->first();

        if ($profile) {
            // Si se encuentra el perfil, retornar los datos
            return response()->json([
                'success' => true,
                'data' => $profile
            ]);
        } else {
            // Si no se encuentra el perfil, retornar un mensaje de error
            return response()->json([
                'success' => false,
                'message' => 'Perfil no encontrado'
            ], 404);
        }
    }
}


