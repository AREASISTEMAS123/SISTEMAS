<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\AttendanceReport;
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
        $averageArea = array_fill(0, 9, null);

        // Crear un array para almacenar solo los valores de "department"
        //filtrar dato por area 
        for ($contador = 0; $contador < 9; $contador++) {
            $averageArea[$contador] = Profile::where('department', $arrArea[$contador])
                ->with('evaluations.softSkills')
                ->get()
                ->map(function ($profile) {
                    return $profile->evaluations->flatMap->softSkills->pluck('prom_end')->avg();
                })->first();

            print("\n el contador es : " . $contador . "el area es: " . $arrArea[$contador] . "\n" . $averageArea[$contador]);
        }

        $arSoftSkills = SoftSkills::get();
        $promedioSoft = 0.0;
        foreach ($arSoftSkills as $softskills) {
            $promedioSoft = $softskills->prom_end + $promedioSoft;

        }
        $promedioSoft = $promedioSoft / (count($arSoftSkills));

        //performance
        $arperformance = Performance::get();
        $promedioPerformance = 0.0;
        foreach ($arperformance as $performance) {
            $promedioPerformance = $performance->prom_end + $promedioPerformance;

        }
        $promedioPerformance = $promedioPerformance / (count($arperformance));

        return response()->json(['average_prom_soft' => $promedioSoft, 'average_prom_performance' => $promedioPerformance]);
    }

    public function getUsersData(Request $request) {

        $query = Profile::query();

        $userData = $query->get('date_start');    

        $userPerMonth = 0;
        $mes_v = $request->input('mes');

        if (is_null($mes_v)) {
            foreach ($userData as $user) {
                echo 'foreach';
                $fecha = $user->date_start; //2023-05-22
                $fechaSegundos = strtotime($fecha);
        
                $dia = date( "j", $fechaSegundos); //22
                $mes = date("n", $fechaSegundos); //05
                $año =  date("Y", $fechaSegundos); //23
                
                echo 'MES--> '.$mes.'REQUEST--> '.$mes_v;

                if ($mes == $request->input('mes')) {
                    echo 'IF';
                    $userPerMonth = $userPerMonth + 1;
                }
            }
        } else {
            echo 'ELSE';
        }
    
        $userCountYear = $query->count();
        $userActive = User::where('status', 1)->count();
        $userInactive = User::where('status', 0)->count();
    
        $userCountsByDepartment = $query->selectRaw('department, COUNT(*) as count')->groupBy('department')->pluck('count', 'department');
        $userCountsByArea = $query->selectRaw('area, COUNT(*) as count')->groupBy('area')->pluck('count', 'area');
        $userCountsByShift = $query->selectRaw('shift, COUNT(*) as count')->groupBy('shift')->pluck('count', 'shift');
    
        return response()->json([
            'userCountYear' => $userCountYear,
            'userActive' => $userActive,
            'userInactive' => $userInactive,
            'userCountsByDepartment' => $userCountsByDepartment,
            'userCountsByArea' => $userCountsByArea,
            'userCountsByShift' => $userCountsByShift,
            'userPerMonth' => $userPerMonth,
        ]);
    }
    
}