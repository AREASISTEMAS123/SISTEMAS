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
        $evaluations = Evaluation::with(['user' => function ($query) {
            $query->select('id', 'name','surname', 'email');
        }])->get();
      
        return response()->json($evaluations, 200);
    }
    
    public function getEvaluationbyid($id)
    {
        $evaluation = Evaluation::with('user')->find($id);

    if (!$evaluation) {
        return response()->json(['message' => 'No se encontró la evaluación'], 404);
    }

    return response()->json($evaluation, 200);
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

