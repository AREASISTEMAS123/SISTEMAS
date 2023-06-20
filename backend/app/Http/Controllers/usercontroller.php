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
}


