<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\Profile;
use App\Models\User;
use App\Models\evaluations;
use App\Models\SoftSkills;

use Illuminate\Database\Eloquent\Builder;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EvaluationController extends Controller 
{
    public function getEvaluation() {
        $attendance_user = Evaluation::with('profile.user')->get();

        return response()->json(['evaluations' => $attendance_user]);
    }

    public function getEvaluationById($id) {
        $attendance_user = Evaluation::with('profile.user')->find($id);

        return response()->json(['evaluations' => $attendance_user]);
    }

    public function insertEvaluation(Evaluation $evaluation) {
        //$evaluation_data = Evaluation::with('profile.user')->get();

        $filteredEvaluations = Profile::whereHas('user', function ($query) {
            $query->where('status', 1);
        })->get();

        foreach ($filteredEvaluations as $evaluation_data) {
            $new_evaluation = new Evaluation();
            $new_evaluation->user_id = $evaluation_data->user_id;
            $new_evaluation->date = date('Y-m-d');

            $new_evaluation->save();
        }

        return response()->json(['evaluations' => $filteredEvaluations]);
    }
}
