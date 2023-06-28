<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\User;
use App\Models\evaluations;

use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    
    public function getEvaluation()
{
    $evaluations = Evaluation::join('users', 'evaluations.user_id', '=', 'users.id')
        ->select('evaluations.id', 'evaluations.user_id', 'users.id as user_id', 'users.name', 'users.email', 'evaluations.model_type', 'evaluations.created_at', 'evaluations.updated_at')
        ->get()
        ->map(function ($evaluation) {
            return [
                'id' => $evaluation->id,
                'user_id' => [
                    'id' => $evaluation->user_id,
                    'name' => $evaluation->name,
                    'email' => $evaluation->email,
                ],
                'model_type' => $evaluation->model_type,
                'created_at' => $evaluation->created_at,
                'updated_at' => $evaluation->updated_at,
            ];
        });
      
    return response()->json($evaluations, 200);
}


    
public function getEvaluationbyid($evaluationId)
{
    $evaluation = Evaluation::join('users', 'evaluations.user_id', '=', 'users.id')
        ->select('evaluations.id', 'evaluations.user_id', 'users.id as user_id', 'users.name', 'users.email', 'evaluations.model_type', 'evaluations.created_at', 'evaluations.updated_at')
        ->where('evaluations.id', $evaluationId)
        ->first();
      
    if ($evaluation) {
        $result = [
            'id' => $evaluation->id,
            'user_id' => [
                'id' => $evaluation->user_id,
                'name' => $evaluation->name,
                'email' => $evaluation->email,
            ],
            'model_type' => $evaluation->model_type,
            'created_at' => $evaluation->created_at,
            'updated_at' => $evaluation->updated_at,
        ];
        return response()->json($result, 200);
    } else {
        return response()->json(['message' => 'No se encontró la evaluación'], 404);
    }
}

    

    public function insertEvaluation(Request $request){
        $Evaluation = evaluations::create($request->all());
        return response($Evaluation,201);
    }

    public function updateEvaluation(Request $request,$id){
        $Evaluation = evaluations::find($id);
        if(is_null($Evaluation)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        $Evaluation -> update($request->all());
        return response($Evaluation,200);
    }


    public function deleteEvaluation(Request $request,$id){
        $Evaluation = Evaluations::find($id);
        if(is_null($Evaluation)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        $Evaluation -> delete();
        return response()->json(['Mensaje'=>'Eliminado Correctamente'],200);
    }
}
