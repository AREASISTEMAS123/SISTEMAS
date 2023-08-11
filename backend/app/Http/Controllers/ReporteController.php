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
        // Por áreas
        $profiles = Profile::get();

        //array con todos las áreas y departamentos
        $departmentsArray = [
            "Departament" => [
                "Administrativo" => ["Administración", "Talento Humano"],
                "Comercial" => ["Comercial"],
                "Operativo" => ["Creativo", "Diseño Web", "Ejecutivo de Cuenta", "Medios Audiovisuales", "Sistemas", "Otro"],
                "default" => [""]
            ]
        ];
        //Por Administración
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
        }
        $promedioPerformance = count($arperformance) > 0 ? $promedioPerformance / (count($arperformance)) : 0;

        return response()->json(['average_prom_soft' => $promedioSoft, 'average_prom_performance' => $promedioPerformance]);
    }

    public function getUsersData(Request $request) {

        $userData = Profile::get('date_start'); 

        $userPerMonth = 0;
        $userPerYear = 0;
        $userPerYearMonth = 0;

        foreach ($userData as $user) {
            $fecha = $user->date_start; //2023-05-22
            $fechaSegundos = strtotime($fecha);
    
            $mes = date("n", $fechaSegundos); //05
            $año =  date("Y", $fechaSegundos); //23
            
            if ($mes == $request->input('mes')){ 
                if ($año == $request->input('año')){
                    // 2023 - 05 - *
                    $userPerYearMonth = $userPerYearMonth + 1; 
                } else {
                    // * - 05 - *
                    $userPerMonth = $userPerMonth + 1;
                }
            } else {
                if ($año == $request->input('año')){
                    // 2023 - * - *
                    $userPerYear = $userPerYear + 1;
                }
            }
        }
    
        $userCountYear = Profile::count();
        $userActive = User::where('status', 1)->count();
        $userInactive = User::where('status', 0)->count();

        $userCountsByDepartment = Profile::selectRaw('department, COUNT(*) as count')->groupBy('department')->pluck('count', 'department');
        $userCountsByShift = Profile::selectRaw('shift, COUNT(*) as count')->groupBy('shift')->pluck('count', 'shift');
        $userCountsByProfile = Profile::selectRaw('profile_name, COUNT(*) as count')->groupBy('profile_name')->pluck('count', 'profile_name');
        $userCountsByNucleo = Profile::selectRaw('area, COUNT(*) as count_nucleo')->groupBy('area')->pluck('count_nucleo', 'area');

        $userCountByStatusLeft = User::selectRaw('status_description, COUNT(*) as count')->groupBy('status_description')->pluck('count', 'status_description');

        return response()->json([
            'userCountYear' => $userCountYear,
            'userActive' => $userActive,
            'userInactive' => $userInactive,
            'userCountsByDepartment' => $userCountsByDepartment,
            'userCountsByNucleo' => $userCountsByNucleo,
            'userCountsByProfile' => $userCountsByProfile,
            'userCountsByShift' => $userCountsByShift,
            'userCountByStatusLeft' => $userCountByStatusLeft,
            'userPerYearMonth' => $userPerYearMonth,
            'userPerMonth' => $userPerMonth,
            'userPerYear' => $userPerYear,
            'date' => date('Y-m-d'),
        ]);



    }
}