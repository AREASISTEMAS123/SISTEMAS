<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\AttendanceReport;


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
}
