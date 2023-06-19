<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\UserTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserTaskController extends Controller
{
    public function gettask(){
        return response()->json(UserTask::all(),200);
    }

    public function gettaskid($id){
        //  $user_task = Auth::user()->id;
        //  $user_task = UserTask::where('id', $user_task)->get();
        $user_tasks = Profile::find($id)->tasks()->get();

        if (is_null($user_tasks)){
            return response() ->json(["message" => "Tarea no encontrada"], 404);
        }

        return response()->json($user_tasks,200);
    }

    public function insertTask(Request $request){
        $rules = array(

            'tittle' => 'required|string',
            'description' => 'required|string',
            'limit_date' => 'required|date',
            'hour' => 'required|date',
        );
        $messages = array(
            'tittle.required' => 'Por favor ingrese el titulo de la tarea',
            'description.required' => 'Por favor ingrese una breve descripcion de la tarea',
            'limit_date.required' => 'Por favor ingrese una fecha limite de la tarea',

        );

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()){
            $messages=$validator->messages();
            return response()->json(["messages"=>$messages],500);

        } $user_task = UserTask::create([

                'user_id' => auth()->id(),
                'tittle' => $request->tittle,
                'description' => $request->description,
                'limit_date' => $request->limit_date,
                'hour' => $request->hour,

            ]);
        return response()->json(['Tarea'=>$user_task, 'messages'=>"Tarea creada con exito"],200);

    }


    

}
