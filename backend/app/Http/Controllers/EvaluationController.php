<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Autoevaluation;
use App\Models\Evaluation;
use App\Models\LeadershipEvaluation;
use App\Models\Profile;
use App\Models\Model_has_role;
use App\Models\Performance;
use App\Models\SoftSkills;

class EvaluationController extends Controller
{
    public function getEvaluation()
    {
        $attendance_user = Evaluation::with('profile.user.roles')->get();

        return response()->json(['evaluations' => $attendance_user]);
    }

    public function insertEvaluation()
    {

        $evaluation_data = Profile::whereHas('user', function ($query) {
            $query->where('status', 1);
        })->first();

        //recogemos id logueado
        $user_id = auth()->id();

        if($evaluation_data) {
            $new_evaluation = new Evaluation();
            $new_evaluation->user_id = $evaluation_data->user_id;
            $new_evaluation->date = date('Y-m-d');
            $new_evaluation->save();

            $user_role = Model_has_role::where('model_id', $evaluation_data->user_id)
                ->where('model_type', 'App\Models\User')
                ->pluck('role_id')
                ->first();
            if ($user_role == 3) {

                //Creo softskills
                $new_softSkills = new SoftSkills();
                $new_softSkills->evaluation_id = $new_evaluation->id; // Aquí asignamos el id de la nueva evaluación
                $new_softSkills->save();

                //Creo performance
                $new_perfomance = new Performance();
                $new_perfomance->evaluation_id = $new_evaluation->id;
                $new_perfomance->save();
                print("Creo para colaboradores");
            }

            //Rol del usuario 
            if ($user_role == 2) {

                //Creo evaluacion de lideres
                print("Creo para lideres");
                $new_leadershipEvaluation = new LeadershipEvaluation();
                $new_leadershipEvaluation->evaluation_id = $new_evaluation->id;
                $new_leadershipEvaluation->save();

                //Creo autoevaluacion de lideres
                $new_Autoevaluation = new Autoevaluation();
                $new_Autoevaluation->evaluation_id = $new_evaluation->id;
                $new_Autoevaluation->save();
            }
        }
        return response()->json(['evaluations' => $evaluation_data]);
    }

    public function getSoftSkills()
    {
        $softSkills = SoftSkills::all();

        return response()->json($softSkills);
    }

    public function getSoftSkillsById($id) {
        $softSkillsById = SoftSkills::where('evaluation_id', $id)->first();

        return response()->json($softSkillsById);
    }

    public function getPerformance()
    {
        $performance = Performance::all();

        return response()->json($performance);
    }

    public function getLeadership()
    {
        $leadership = LeadershipEvaluation::all();

        return response()->json($leadership);
    }

    public function getAutoevaluation()
    {
        $leadership = Autoevaluation::all();

        return response()->json($leadership);
    }

    public function updateSoftSkills($id, Request $request)
    {
        $softSkills = SoftSkills::find($id);

        $user_id = auth()->id();

        $softSkills->evaluator_id = $user_id;
        $softSkills->note1 = $request->input('note1');
        $softSkills->note2 = $request->input('note2');
        $softSkills->note3 = $request->input('note3');
        $softSkills->note4 = $request->input('note4');
        $prom_end = ($softSkills->note1 + $softSkills->note2 + $softSkills->note3 + $softSkills->note4) / 4;
        $softSkills->prom_end = $prom_end;

        $prom_quincenal_1 = ($softSkills->note1 + $softSkills->note2) / 2;
        $prom_quincenal_2 = ($softSkills->note3 + $softSkills->note4) / 2;

        $softSkills->save();
        //insertar promedios mensuales
        $performanceAverage = Performance::where('evaluation_id', $id)->pluck('prom_end')->first();
        $ejemplo = $this->calcAverage($id, $prom_end, $performanceAverage);

        return response()->json([
            'softSkills' => $softSkills,
            'prom_pr_quincenal' => $prom_quincenal_1,
            'prom_sg_quincenal' => $prom_quincenal_2
        ]);
    }

    public function updatePerformance($id, Request $request)
    {
        $performance = Performance::find($id);

        $user_id = auth()->id();

        $performance->evaluator_id = $user_id;
        $performance->note1 = $request->input('note1');
        $performance->note2 = $request->input('note2');
        $performance->note3 = $request->input('note3');
        $performance->note4 = $request->input('note4');
        $prom_end = ($performance->note1 + $performance->note2 + $performance->note3 + $performance->note4) / 4;
        $performance->prom_end = $prom_end;

        $prom_quincenal_1 = ($performance->note1 + $performance->note2) / 2;
        $prom_quincenal_2 = ($performance->note3 + $performance->note4) / 2;

        $performance->save();

        //insertar promedios mensuales
        $softSkillsAverage = SoftSkills::where('evaluation_id', $id)->pluck('prom_end')->first();
        $ejemplo = $this->calcAverage($id, $prom_end, $softSkillsAverage);

        return response()->json([
            'performance' => $performance,
            'prom_pr_quincenal' => $prom_quincenal_1,
            'prom_sg_quincenal' => $prom_quincenal_2
        ]);
    }

    public function updateLeadership($id, Request $request)
    {
        $leadership = Performance::find($id);

        $user_id = auth()->id();

        $leadership->evaluator_id = $user_id;
        $leadership->note1 = $request->input('note1');
        $leadership->note2 = $request->input('note2');
        $leadership->note3 = $request->input('note3');
        $leadership->note4 = $request->input('note4');
        $prom_end = ($leadership->note1 + $leadership->note2 + $leadership->note3 + $leadership->note4) / 4;
        $leadership->prom_end = $prom_end;

        $prom_quincenal_1 = ($leadership->note1 + $leadership->note2) / 2;
        $prom_quincenal_2 = ($leadership->note3 + $leadership->note4) / 2;

        $leadership->save();

        //insertar promedios mensuales
        $PerformanceAverage = Performance::where('evaluation_id', $id)->pluck('prom_end')->first();
        $ejemplo = $this->calcAverage($id, $prom_end, $PerformanceAverage);

        return response()->json([
            'leadership' => $leadership,
            'prom_pr_quincenal' => $prom_quincenal_1,
            'prom_sg_quincenal' => $prom_quincenal_2
        ]);
    }

    public function updateAutoevaluation($id, Request $request)
    {
        $autoevaluation = Autoevaluation::find($id);

        $user_id = auth()->id();

        $autoevaluation->evaluator_id = $user_id;
        $autoevaluation->note1 = $request->input('note1');
        $autoevaluation->note2 = $request->input('note2');
        $autoevaluation->note3 = $request->input('note3');
        $autoevaluation->note4 = $request->input('note4');
        $prom_end= ($autoevaluation->note1 + $autoevaluation->note2 + $autoevaluation->note3 + $autoevaluation->note4) / 4;
        $autoevaluation->prom_end = $prom_end;

        $prom_quincenal_1 = ($autoevaluation->note1 + $autoevaluation->note2) / 2;
        $prom_quincenal_2 = ($autoevaluation->note3 + $autoevaluation->note4) / 2;

        $autoevaluation->save();
        //insertar promedios mensuales
        $AutoevaluationAverage = Autoevaluation::where('evaluation_id', $id)->pluck('prom_end')->first();
        $ejemplo = $this->calcAverage($id, $prom_end, $AutoevaluationAverage);
        return response()->json([
            'autoevaluation' => $autoevaluation,
            'prom_pr_quincenal' => $prom_quincenal_1,
            'prom_sg_quincenal' => $prom_quincenal_2
        ]);
    }

    public function getEvaluationDetails($id)
    {

        $evaluation = Evaluation::find($id);

        $softSkills = SoftSkills::where('evaluation_id', $id)->first();

        if ($softSkills != null) {
            $prom_quincenal_soft_1 = ($softSkills->note1 + $softSkills->note2) / 2;
            $prom_quincenal_soft_2 = ($softSkills->note3 + $softSkills->note4) / 2;
        } else {
            $prom_quincenal_soft_1 = 0;
            $prom_quincenal_soft_2 = 0;
        }

        $performance = Performance::where('evaluation_id', $id)->first();

        if ($performance != null) {
            $prom_quincenal_per_1 = ($performance->note1 + $performance->note2) / 2;
            $prom_quincenal_per_2 = ($performance->note3 + $performance->note4) / 2;
        } else {
            $prom_quincenal_per_1 = 0;
            $prom_quincenal_per_2 = 0;
        }

        $leadership = LeadershipEvaluation::where('evaluation_id', $id)->first();

        if ($leadership != null) {
            $prom_quincenal_lead_1 = ($leadership->note1 + $leadership->note2) / 2;
            $prom_quincenal_lead_2 = ($leadership->note3 + $leadership->note4) / 2;
        } else {
            $prom_quincenal_lead_1 = 0;
            $prom_quincenal_lead_2 = 0;
        }

        $autoevaluation = Autoevaluation::where('evaluation_id', $id)->first();

        if ($autoevaluation != null) {
            $prom_quincenal_auto_1 = ($autoevaluation->note1 + $autoevaluation->note2) / 2;
            $prom_quincenal_auto_2 = ($autoevaluation->note3 + $autoevaluation->note4) / 2;
        } else {
            $prom_quincenal_auto_1 = 0;
            $prom_quincenal_auto_2 = 0;
        }

        return response()->json([
            'evaluations' => $evaluation,
            'softSkills' => [
                'data' => $softSkills,
                'prom_pr_quincenal' => $prom_quincenal_soft_1,
                'prom_sg_quincenal' => $prom_quincenal_soft_2,
            ],
            'performance' => [
                'data' => $performance,
                'prom_pr_quincenal' => $prom_quincenal_per_1,
                'prom_sg_quincenal' => $prom_quincenal_per_2,
            ],
            'leadership' => [
                'data' => $leadership,
                'prom_pr_quincenal' => $prom_quincenal_lead_1,
                'prom_sg_quincenal' => $prom_quincenal_lead_2,
            ],
            'autoevaluation' => [
                'data' => $autoevaluation,
                'prom_pr_quincenal' => $prom_quincenal_auto_1,
                'prom_sg_quincenal' => $prom_quincenal_auto_2,
            ],
        ]);
    }



    public function calcAverage($id, $nota1, $nota2)
    {

        $evaluation = Evaluation::find($id);
        $overallAverage = ($nota1 + $nota2) / 2;
        // Actualizar el campo 'average' en la tabla 'evaluations'
        $evaluation->average = $overallAverage;
        $evaluation->save();

        return response()->json(['mensaje' => 'Promedios calculados y actualizados exitosamente.']);
    }


}