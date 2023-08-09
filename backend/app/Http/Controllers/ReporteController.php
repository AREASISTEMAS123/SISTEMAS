<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\AttendanceReport;
use App\Models\Performance;
use App\Models\Profile;
use App\Models\SoftSkills;

class ReporteController extends Controller
{
    public function generarReporteGeneral(Request $request)
    {
        // Obtener los datos de la tabla attendances
        $attendances = Attendance::all();

        // Procesar los datos y calcular los valores para el reporte
        $reportData = [];

        foreach ($attendances as $attendance) {
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




        //areas
        // foreach ($profiles as $profile) {
        //     if ($profile->department == $departmentsArray["Departament"]["Administrativo"][0]) {

        //     } else if ($profile->department == $departmentsArray["Departament"]["Administrativo"][1]) {
        //         print("estrategico");
        //     } else if ($profile->department == $departmentsArray["Departament"]["Comercial"][0]) {

        //     } else if ($profile->department == $departmentsArray["Departament"]["Operativo"][1]) {

        //     } else if ($profile->department == $departmentsArray["Departament"]["Operativo"][2]) {

        //     } else if ($profile->department == $departmentsArray["Departament"]["Operativo"][3]) {

        //     } else if ($profile->department == $departmentsArray["Departament"]["Operativo"][4]) {
        //         $averageDeparArea["Operativo"] = $averageDeparArea["Operativo"] + 1;

        //     } else if ($profile->department == $departmentsArray["Departament"]["Operativo"][5]) {

        //     } else if ($profile->department == $departmentsArray["Departament"]["Operativo"][6]) {

        //     }

        // }


        // Convertir el array en formato JSON y imprimirlo














        //colaboradores en general
        //softskills
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
}