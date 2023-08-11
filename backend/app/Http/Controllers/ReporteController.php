<?php

namespace App\Http\Controllers;

use App\Models\LeadershipEvaluation;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\AttendanceReport;
use App\Models\Autoevaluation;
use App\Models\Performance;
use App\Models\Profile;
use App\Models\SoftSkills;
use App\Models\User;
use Illuminate\Support\Carbon;

class ReporteController extends Controller
{
    public function generarReporteGeneral(Request $request)
    {
        // Obtener los datos de la tabla attendances
        $attendances = Attendance::all(); // Esto es un ejemplo, puedes ajustarlo según tus necesidades

        // Procesar los datos y calcular los valores para el reporte
        $reportData = []; // Inicializar un arreglo para los datos del reporte

        foreach ($attendances as $attendance) {
            // Realiza los cálculos necesarios para llenar los atributos del reporte
            $reportData[] = [
                'attendances' => $attendance->attendances,
                'delays' => $attendance->delays,
                'absences' => $attendance->absences,
                'justifications' => $attendance->justifications,
                'total' => $attendance->total,
                'shift' => $attendance->shift,
                'date' => $attendance->date,
            ];
        }

        // Insertar los datos en la tabla attendance_reports
        AttendanceReport::insert($reportData);

        return response()->json(['message' => 'Reporte generado y llenado exitosamente']);
    }

    public function index()
    {
        $reports = AttendanceReport::all();
        return response()->json($reports);
    }

    public function show($id)
    {
        $report = AttendanceReport::findOrFail($id);
        return response()->json($report);
    }

    public function getAllReports()
    {
        //colaboradores en general
        $arrArea = ["Administración", "Talento Humano", "Comercial", "Creativo", "Diseño Web", "Ejecutivo de Cuenta", "Medios Audiovisuales", "Sistemas", "Otro"];
        $averagesoftArea = array_fill(0, 9, null);
        $averagePerformanceArea = array_fill(0, 9, null);
        $averageAutoevaluationArea = array_fill(0, 9, null);
        $averageLeadershipArea = array_fill(0, 9, null);
        // Crear un array para almacenar solo los valores de "department"
        //filtrar dato por area 

        for ($contador = 0; $contador < 9; $contador++) {
            $averagesoftArea[$contador] = SoftSkills::whereHas('evaluation.profile', function ($query) use ($arrArea, $contador) {
                $query->where('department', $arrArea[$contador]);
            })->avg('prom_end');

            $averagePerformanceArea[$contador] = Performance::whereHas('evaluation.profile', function ($query) use ($arrArea, $contador) {
                $query->where('department', $arrArea[$contador]);
            })->avg('prom_end');

            $averageAutoevaluationArea[$contador] = Autoevaluation::whereHas('evaluation.profile', function ($query) use ($arrArea, $contador) {
                $query->where('department', $arrArea[$contador]);
            })->avg('prom_end');

            $averageLeadershipArea[$contador] = LeadershipEvaluation::whereHas('evaluation.profile', function ($query) use ($arrArea, $contador) {
                $query->where('department', $arrArea[$contador]);
            })->avg('prom_end');
        }
        //softskills


        $arSoftSkills = SoftSkills::get();
        $promedioSoft = 0.0;
        foreach ($arSoftSkills as $softskills) {
            $promedioSoft = $softskills->prom_end + $promedioSoft;
        }
        $promedioSoft = count($arSoftSkills) > 0 ? $promedioSoft / (count($arSoftSkills)) : 0;

        //performance
        $arperformance = Performance::get();
        $promedioPerformance = 0.0;
        foreach ($arperformance as $performance) {
            $promedioPerformance = $performance->prom_end + $promedioPerformance;

        //Leadership
        $arLeadership = LeadershipEvaluation::get();
        $promedioLeadership = 0.0;
        foreach ($arLeadership as $Leadership) {
            $promedioLeadership = $Leadership->prom_end + $promedioLeadership;
        }
        $promedioLeadership = (count($arLeadership)) > 0 ? $promedioLeadership / (count($arLeadership)) : 0;
        //Autoevalution
        $arAutoevaluation = Autoevaluation::get();
        $promedioAutoevalution = 0.0;
        foreach ($arAutoevaluation as $Autoevalution) {
            $promedioAutoevalution = $Autoevalution->prom_end + $promedioAutoevalution;
        }
        $promedioPerformance = $promedioPerformance / (count($arperformance));

        return response()->json(['average_prom_soft' => $promedioSoft, 'average_prom_performance' => $promedioPerformance]);
    }
    
}