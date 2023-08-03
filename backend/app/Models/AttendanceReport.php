<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceReport extends Model
{
    use HasFactory;
    protected $fillable = [
        'attendances',
        'delays',
        'absences',
        'justifications',
        'total',
        'shift',
        'date',
    ];
}
public function generarReporteGeneral(Request $request)
{
    // Obtener los datos de la tabla attendances
    $attendances = Attendance::all(); 
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
