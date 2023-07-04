<?php

namespace App\Http\Controllers;

use App\Models\Justification;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;

class JustificationController extends Controller
{
    public function insertJustification(Request $request){
        $rules = array(

            'justification_date' => 'required|date',
            'reason' => 'required|string',
            'evidence' => 'required',

        );
        $messages = array(
            'evidence.required' => 'Por favor ingrese un archivo que evidencie la justificacion',
            'reason.required' => 'Por favor ingrese una breve descripcion de la justificacion',
            'justification_date.required' => 'Por favor ingrese una fecha para la justificacion',

        );

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()){
            $messages=$validator->messages();
            return response()->json(["messages"=>$messages],500);
        }

        try {
            DB::beginTransaction();
            $justification = new Justification;
            $justification -> reason = $request->get('reason');
            $justification -> user_id = auth()->id();
            $justification -> justification_date = $request->get('justification_date');

            if($request->hasFile('evidence')){
                $archivo =$request->file('evidence');
                $archivo ->move(public_path().'/archivos/',$archivo->getClientOriginalName());
                $justification->evidence = $archivo->getClientOriginalName();
            }
            $justification->save();
            DB::commit();
        } catch (Exception $e){
                DB::rollBack();
        }
    }
}
