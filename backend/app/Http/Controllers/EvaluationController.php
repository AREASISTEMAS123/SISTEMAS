<?php

namespace App\Http\Controllers;

use App\Models\Autoevaluation;
use App\Models\Evaluation;
use App\Models\LeadershipEvaluation;
use App\Models\Profile;
use App\Models\User;
use App\Models\evaluations;
use App\Models\Model_has_role;
use App\Models\Performance;
use App\Models\SoftSkills;

use Illuminate\Database\Eloquent\Builder;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EvaluationController extends Controller
{
    // public function getEvaluation()
    // {
    //     $attendance_user = Evaluation::with('profile.user')->get();

    //     return response()->json(['evaluations' => $attendance_user]);
    // }


    public function insertEvaluation(Evaluation $evaluation)
    {
        //$evaluation_data = Evaluation::with('profile.user')->get();

        $filteredEvaluations = Profile::whereHas('user', function ($query) {
            $query->where('status', 1);
        })->get();

        //recogemos id logueado
        $user_id = auth()->id();

        foreach ($filteredEvaluations as $evaluation_data) {
            $new_evaluation = new Evaluation();
            $new_evaluation->user_id = $evaluation_data->user_id;
            $new_evaluation->date = date('Y-m-d');
            $new_evaluation->save();

            $user_role = Model_has_role::where('model_id', $evaluation_data->user_id)
                ->where('model_type', 'App\Models\User')
                ->pluck('role_id')
                ->first();
            if ($user_role == 3) {
                //creo softskills
                $new_softSkills = new SoftSkills();
                $new_softSkills->evaluation_id = $new_evaluation->id; // Aquí asignamos el id de la nueva evaluación
                $new_softSkills->save();
                //creo performance
                $new_perfomance = new Performance();
                $new_perfomance->evaluation_id = $new_evaluation->id;
                $new_perfomance->save();
                print("creo para colaboradores");
            }
            //rol del usuario 
            if ($user_role == 2) {
                //creo evaluacion de lideres
                print("creo para lideres");
                $new_leadershipEvaluation = new LeadershipEvaluation();
                $new_leadershipEvaluation->evaluation_id = $new_evaluation->id;
                $new_leadershipEvaluation->save();
                //creo autoevaluacion de lideres
                $new_Autoevaluation = new Autoevaluation();
                $new_Autoevaluation->evaluation_id = $new_evaluation->id;
                $new_Autoevaluation->save();
            }
        }
        return response()->json(['evaluations' => $filteredEvaluations]);
    }

    public function getSoftSkills()
    {
        $softSkills = SoftSkills::all();

        return response()->json($softSkills);
    }
    
    public function getSoftSkillsById($id)
    {

        $softSkills = SoftSkills::where('evaluation_id', $id)->get();

        return response()->json($softSkills);
    }

    public function insertValueById()
    {

    }

}