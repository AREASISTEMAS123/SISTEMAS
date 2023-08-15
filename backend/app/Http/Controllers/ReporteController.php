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

class ReporteController extends Controller
{
    public function filterMonth()//filtrar mes 
    {

    }
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
            $department = $arrArea[$contador];

            $evaluationQuery = function ($query) use ($department) {
                $query->where('department', $department);
            };

            $averagesoftArea[$contador] = SoftSkills::whereHas('evaluation.profile', $evaluationQuery)->avg('prom_end');
            $averagePerformanceArea[$contador] = Performance::whereHas('evaluation.profile', $evaluationQuery)->avg('prom_end');
            $averageAutoevaluationArea[$contador] = Autoevaluation::whereHas('evaluation.profile', $evaluationQuery)->avg('prom_end');
            $averageLeadershipArea[$contador] = LeadershipEvaluation::whereHas('evaluation.profile', $evaluationQuery)->avg('prom_end');
        }
        //softskills
        $arSoftSkills = SoftSkills::get();
        //performance
        $arperformance = Performance::get();
        //Leadership
        $arLeadership = LeadershipEvaluation::get();
        //Autoevalution
        $arAutoevaluation = Autoevaluation::get();

        $promedioSoft = $arSoftSkills->avg('prom_end');
        $promedioPerformance = $arperformance->avg('prom_end');
        $promedioLeadership = $arLeadership->avg('prom_end');
        $promedioAutoevalution = $arAutoevaluation->avg('prom_end');


        $promedioAdministrativosoft = ($averagesoftArea[0] + $averagesoftArea[1]) / 2;
        $promedioOperativosoft = array_sum(array_slice($averagesoftArea, 3, 6)) / 6;

        $promedioAdministrativoPerformance = ($averagePerformanceArea[0] + $averagePerformanceArea[1]) / 2;
        $promedioOperativoPerformance = array_sum(array_slice($averagePerformanceArea, 3, 6)) / 6;

        $promedioAdministrativoLeadership = ($averageLeadershipArea[0] + $averageLeadershipArea[1]) / 2;
        $promedioOperativoLeadership = array_sum(array_slice($averageLeadershipArea, 3, 6)) / 6;

        $promedioAdministrativoAutoevaluation = ($averageAutoevaluationArea[0] + $averageAutoevaluationArea[1]) / 2;
        $promedioOperativoAutoevaluation = array_sum(array_slice($averageAutoevaluationArea, 3, 6)) / 6;

        return response()->json([
            'average_prom_soft' => [
                'total' => $promedioSoft,
                'Departament' => [
                    'Administrativo' => [
                        'Promedio' => $promedioAdministrativosoft,
                        'Administración' => $averagesoftArea[0],
                        'Talento_Humano' => $averagesoftArea[1]
                    ],
                    'Comercial' => [
                        'Promedio' => $averagesoftArea[2],
                        'Comercial' => $averagesoftArea[2]
                    ],
                    'Operativo' => [
                        'Promedio' => $promedioOperativosoft,
                        'Creativo' => $averagesoftArea[3],
                        'Diseño_Web' => $averagesoftArea[4],
                        'Ejecutivo_de_Cuenta' => $averagesoftArea[5],
                        'Medios_AudioVisuales' => $averagesoftArea[6],
                        'Sistemas' => $averagesoftArea[7],
                        'Otro' => $averagesoftArea[8]
                    ],

                ]
            ],
            'average_prom_performance' => [
                'total' => $promedioPerformance,
                'Departament' => [
                    'Administrativo' => [
                        'Promedio' => $promedioAdministrativoPerformance,
                        'Administración' => $averagePerformanceArea[0],
                        'Talento_Humano' => $averagePerformanceArea[1],
                    ],
                    'Comercial' => [
                        'Promedio' => $averagePerformanceArea[2],
                        'Comercial' => $averagePerformanceArea[2]
                    ],
                    'Operativo' => [
                        'Promedio' => $promedioOperativoPerformance,
                        'Creativo' => $averagePerformanceArea[3],
                        'Diseño_Web' => $averagePerformanceArea[4],
                        'Ejecutivo_de_Cuenta' => $averagePerformanceArea[5],
                        'Medios_AudioVisuales' => $averagePerformanceArea[6],
                        'Sistemas' => $averagePerformanceArea[7],
                        'Otro' => $averagePerformanceArea[8]
                    ],

                ]
            ],
            'average_prom_Leadership' => [
                'total' => $promedioLeadership,
                'Departament' => [
                    'Administrativo' => [
                        'Promedio' => $promedioAdministrativoLeadership,
                        'Administración' => $averageLeadershipArea[0],
                        'Talento_Humano' => $averageLeadershipArea[1]
                    ],
                    'Comercial' => [
                        'Promedio' => $averageLeadershipArea[2],
                        'Comercial' => $averageLeadershipArea[2]
                    ],
                    'Operativo' => [
                        'Promedio' => $promedioOperativoLeadership,
                        'Creativo' => $averageLeadershipArea[3],
                        'Diseño_Web' => $averageLeadershipArea[4],
                        'Ejecutivo_de_Cuenta' => $averageLeadershipArea[5],
                        'Medios_AudioVisuales' => $averageLeadershipArea[6],
                        'Sistemas' => $averageLeadershipArea[7],
                        'Otro' => $averageLeadershipArea[8]
                    ],

                ]
            ],
            'average_prom_Autoevaluation' => [
                'total' => $promedioAutoevalution,
                'Departament' => [
                    'Administrativo' => [
                        'Promedio' => $promedioAdministrativoAutoevaluation,
                        'Administración' => $averageAutoevaluationArea[0],
                        'Talento_Humano' => $averageAutoevaluationArea[1]
                    ],
                    'Comercial' => [
                        'Promedio' => $averageAutoevaluationArea[2],
                        'Comercial' => $averageAutoevaluationArea[2]
                    ],
                    'Operativo' => [
                        'Promedio' => $promedioOperativoAutoevaluation,
                        'Creativo' => $averageAutoevaluationArea[3],
                        'Diseño_Web' => $averageAutoevaluationArea[4],
                        'Ejecutivo_de_Cuenta' => $averageAutoevaluationArea[5],
                        'Medios_AudioVisuales' => $averageAutoevaluationArea[6],
                        'Sistemas' => $averageAutoevaluationArea[7],
                        'Otro' => $averageAutoevaluationArea[8]
                    ],

                ]
            ]
        ]);



    }
}