<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Profile;
use App\Models\User;
use App\Traits\AttendanceNotificationTrait;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller {

    public function getAttendance(){
        $attendance_user = Attendance::with('user', 'profile')->get();

        return response()->json(['attendance' => $attendance_user]);
    }

    // Traigo el trait de notification
    use AttendanceNotificationTrait;

    public function insertAttendance(Request $request) {
        $user_id = auth()->id();

        // Obtener el registro de asistencia del usuario para la fecha actual
        $attendance = Attendance::where('user_id', $user_id)
            ->whereDate('date', date('Y-m-d'))
            ->first();

        if (empty($attendance) == 1) {

            // No existe un registro de asistencia para la fecha actual, crear uno nuevo

            $attendance = new Attendance();

            $attendance->date = $request->input('date');
            $attendance->admission_time = $request->input('admission_time');

            // Recogemos los datos del turno del usuario logeado (shift)

            $user_profile = Profile::where('user_id', $user_id)->get();

            // Si el turno es tarde, la hora de entrada es a las 14:11:00, si es mañana, a las 08:11:00

            $user_profile[0]['shift'] = 'Tarde' ? $hora = '14:11:00' : $hora = '08:11:00';

            // Aumentamos los valores de asistencia o tardanza dependiendo de la condicional

            if ($attendance->admission_time >= $hora){
                $attendance->delay = 1;
            } else {
                $attendance->attendance = 1;
            }

            $attendance->user_id = $user_id;

            if ($request->hasFile("admission_image")) {
                $file = $request->file("admission_image");
                $attendance->admission_image = $file->getClientOriginalName();
            }

            $attendance->save();

            return response()->json(['attendance' => $attendance]);

        } else {

            // Existe un registro de asistencia para la fecha actual

            if (is_null($attendance->departure_time)) {

                // Actualizar el registro existente con la hora de salida

                $attendance->departure_time = $request->input('departure_time');

                if ($request->hasFile("departure_image")) {
                    $file = $request->file("departure_image");
                    $attendance->departure_image = $file->getClientOriginalName();
                }

                $attendance->save();
                return response()->json(['attendance' => $attendance]);

            } else {
                // Retornar error de marcado de asistencia
                return response()->json(['error' => 'Ya marcaste asistencia']);
            }
        }

        // Logica para notificar a gerencia y el lider de departamento
        
        // Obtener user por ID
        $user = User::all()
                        ->except($attendance->user_id);
                        // ->each(function(User $user) use ($attendance){

                        // });
        // Calcula el numero de faltas del usuario
        $faltasCount = $this->calculateFaltasCount($user_id);

        // Si el usuario tiene 2 faltas se envia advertencia al lider del departamento, si tiene 3 la alerta llega a gerencia
        if($faltasCount === 3) {
            // auth()->user()->
        } else if ($faltasCount === 2) {
            $this->sendNotification($user, $faltasCount, 'advertencia');
        }
    }

    // Método para calcular el número de faltas del usuario
    private function calculateFaltasCount($user_id)
    {
        // Obtener las asistencias del usuario
        $attendances = Attendance::where('user_id', $user_id)->get();

        // Contar las faltas
        $faltasCount = 0;
        foreach ($attendances as $attendance) {
            // Si el campo 'attendance' es false, entonces es falta
            if (!$attendance->attendance) {
                $faltasCount++;
            }
        }

        return $faltasCount;
    }
}