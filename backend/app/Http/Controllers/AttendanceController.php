<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\AttendanceReport;
use App\Models\Holiday;
use App\Models\Profile;
use App\Models\User;
use App\Models\Notification;

class AttendanceController extends Controller
{
    public $user_id;

    public function getAttendance()
    {
        $attendance_user = Attendance::with('user', 'profile')->get();
        $report = AttendanceReport::all();
        return response()->json(['attendance' => $attendance_user, "reports" => $report]);
    }
    public function getAttendanceByID()
    {
        //Recogemos el ID del usuario logeado
        $user_id = auth()->id();

        // Obtener el registro de asistencia del usuario para el usuario actualmente logeado
        $attendance = Attendance::where('user_id', $user_id)->get();

        //Retornamos la respuesta en formato JSON
        return response()->json(['attendance' => $attendance]);
    }
    public function setDefaultValues()
    {
        // Obten el ID del usuario actualmente autenticado
        $user_id = auth()->id();

        // Obten el turno del administrador actual
        $adminShift = Profile::where('user_id', $user_id)->value('shift');

        // Busca usuarios que estén habilitados y pertenezcan al turno del administrador
        $users = User::where('status', 1)
            ->whereHas('profile', function ($query) use ($adminShift) {
                $query->where('shift', $adminShift);
            })->get();

        // Recorre cada usuario
        foreach ($users as $user) {
            // Verifica si ya existe una entrada de asistencia para este usuario para la fecha actual
            if (!Attendance::where('user_id', $user->id)->whereDate('date', date('Y-m-d'))->exists()) {
                // Si no existe una entrada de asistencia, crea una nueva marcada como ausencia
                $attendance = new Attendance();
                $attendance->user_id = $user->id;
                $attendance->date = date('Y-m-d');
                $attendance->absence = 1;
                $attendance->save();
            }
        }
    }

    public function setNonWorkingDays()
    {
        // Obten el ID del usuario actualmente autenticado
        $user_id = auth()->id();

        // Obten el turno del administrador actual
        $adminShift = Profile::where('user_id', $user_id)->value('shift');

        // Busca usuarios que estén habilitados y pertenezcan al turno del administrador
        $users = User::where('status', 1)
            ->whereHas('profile', function ($query) use ($adminShift) {
                $query->where('shift', $adminShift);
            })->get();

        // Obtén la fecha de mañana
        $tomorrow = date('Y-m-d', strtotime('tomorrow'));

        // Verificar si mañana es un día no laborable
        $isNonWorkingDay = Holiday::where('date', $tomorrow)->exists();

        foreach ($users as $user) {
            if (Attendance::where('user_id', $user->id)->whereDate('date', $tomorrow)->exists()) {
                continue;
            }
            $attendance = new Attendance();
            $attendance->user_id = $user->id;
            $attendance->date = $tomorrow;

            if ($isNonWorkingDay) {
                $attendance->absence = 0;
                $attendance->non_working_days = 1;
            } else {
                continue;
            }

            $attendance->save();
        }
    }


    public function generateReport()
    {

        //Generar reporte general de asistencias, faltas y tardanzas

        $this->setDefaultValues();

        $attendances = 0;
        $delays = 0;
        $absence = 0;
        $justifications = 0;

        // Recogemos el ID del usuario logeado
        $user_id = auth()->id();

        $admin = Profile::where('user_id', $user_id)->get('shift');

        if ($admin[0]->shift == 'Mañana') {
            $profile = Profile::where('shift', 'Mañana')->get('user_id');
            $shift = 'Mañana';
        } else {
            $profile = Profile::where('shift', 'Tarde')->get('user_id');
            $shift = 'Tarde';
        }

        foreach ($profile as $user) {
            if (Attendance::where('user_id', $user->user_id)->where('attendance', 1)->where('date', date('Y-m-d'))->count() == 1) {
                $attendances = $attendances + 1;
            } else if (Attendance::where('user_id', $user->user_id)->where('justification', 0)->where('delay', 1)->where('date', date('Y-m-d'))->count() == 1) {
                $delays = $delays + 1;

            } else if (Attendance::where('user_id', $user->user_id)->where('justification', 0)->where('absence', 1)->where('date', date('Y-m-d'))->count() == 1) {
                $absence = $absence + 1;

            } else if (Attendance::where('user_id', $user->user_id)->where('justification', 1)->where('date', date('Y-m-d'))->count() == 1) {
                $justifications = $justifications + 1;
            }
        }

        $attendanceReport = new AttendanceReport();

        //Setear los valores en la tabla AttendanceReport
        $attendanceReport->attendances = $attendances;
        $attendanceReport->delays = $delays;
        $attendanceReport->absences = $absence;
        $attendanceReport->shift = $shift;
        $attendanceReport->justifications = $justifications;
        $attendanceReport->date = date('Y-m-d');

        //Guardar la informacion en la tabla AttendanceReport


        //Agregamos una nueva notificacion (Validacion de Faltas)
        $userCounter = User::all()->count();
        $notifications = [];


        for ($id = 1; $id <= $userCounter; $id++) {
            $abs = Attendance::all()->where('user_id', $id)->where('absence', '1')->count();
            if ($abs === 3) {
                $notif = Notification::create(['user_id' => $id, 'data' => 'Este usuario tiene 3 faltas']);
                array_push($notifications, $notif);
            } else if ($abs === 2) {
                $notif = Notification::create(['user_id' => $id, 'data' => 'Este usuario tiene 2 faltas']);
                array_push($notifications, $notif);
            }
        }


        #return response()->json(['notificaciones' => $notifications]);
        $total = 0;

        foreach ($profile as $user) {
            if (Attendance::where('user_id', $user->user_id)->where('date', date('Y-m-d'))->count() >= 1) {
                $total = $total + 1;
            }
        }

        $attendanceReport->total = $total;
        $attendanceReport->save();


        $this->setNonWorkingDays();
        //Retornamos la respuesta en formato JSON


        //Retornamos la respuesta en formato JSON
        return response()->json([
            'attendance' => $attendances,
            'delays' => $delays,
            'absences' => $absence,
            'justifications' => $justifications,
            'date' => date('Y-m-d'),
            'total' => $total
        ]);

    }


    public function insertAttendance(Request $request)
    {
        // Recogemos el ID del usuario logeado
        $user_id = auth()->id();

        // Obtener el registro de asistencia del usuario para la fecha actual
        $attendance = Attendance::where('user_id', $user_id)
            ->whereDate('date', date('Y-m-d'))
            ->first();

        // Recogemos los datos del turno del usuario logeado (shift)
        $user_profile = Profile::where('user_id', $user_id)->get();

        // Si el turno es tarde, la hora de salida es a las 19:00:00, si es mañana, a las 13:00:00
        $departure_hour = $user_profile[0]['shift'] == 'Tarde' ? '19:01:00' : '13:01:00';

        if (empty($attendance)) {
            // No existe un registro de asistencia para la fecha actual, crear uno nuevo
            $attendance = new Attendance();

            // Recogemos los valores de fecha y tiempo de marcado de entrada
            $attendance->date = $request->input('date');
            $attendance->admission_time = $request->input('admission_time');

            // Si el turno es tarde, la hora de entrada es a las 14:11:00, si es mañana, a las 08:11:00
            $hora = $user_profile[0]['shift'] == 'Tarde' ? '14:11:00' : '08:11:00';

            // Aumentamos los valores de asistencia o tardanza dependiendo de la condicional
            if ($attendance->admission_time >= $hora) {
                $attendance->delay = 1;
            } else {
                $attendance->attendance = 1;
            }

            // Recogemos el ID del usuario logeado
            $attendance->user_id = $user_id;

            if ($request->hasFile("admission_image")) {

                // Recogemos la imagen de entrada
                $file = $request->file("admission_image");
                $folderName = date("Y-m-d"); // Obtiene la fecha de hoy en formato "año-mes-día"
                $path = "attendance/" . $folderName; // Ruta de la carpeta con la fecha de hoy
                $filename = time() . "-" . $file->getClientOriginalName();
                $uploadSuccess = $file->move($path, $filename);
                $attendance->admission_image = $path . "/" . $filename;

            } else {
                // Retornar error si la imagen no existe
                return response()->json(['message' => 'Se requiere una imagen']);
            }

            // Guardamos los cambios en la base de datos
            $attendance->save();

            // Retornamos la respuesta en formato JSON
            return response()->json(['attendance' => $attendance]);

        } else {

            $existingAttendance = $request->input('admission_time');

            if ($existingAttendance != null) {
                // Ya se ha registrado la asistencia para esta fecha y usuario
                return response()->json(['message' => 'Ya has marcado asistencia para hoy']);
            }

            // La hora actual es mayor que la de salida, si no marcó hora de salida, se le marca falta.
            if ($departure_hour < date('H:i:s') && is_null($attendance->departure_time)) {

                // Seteamos los valores de asistencia o tardanza dependiendo de la condicional
                $attendance->delay = 0;
                $attendance->attendance = 0;
                $attendance->absence = 1;

                // Guardamos los cambios en la base de datos
                $attendance->save();

                // Retornamos la respuesta en formato JSON
                return response()->json(['attendance' => $attendance]);
            }

            // Existe un registro de asistencia para la fecha actual
            if (is_null($attendance->departure_time)) {

                // Actualizar el registro existente con la hora de salida
                $attendance->departure_time = $request->input('departure_time');

                if ($request->hasFile("departure_image")) {

                    // Recogemos la imagen de salida
                    $file = $request->file("departure_image");
                    $folderName = date("Y-m-d"); // Obtiene la fecha de hoy en formato "año-mes-día"
                    $path = "attendance/" . $folderName; // Ruta de la carpeta con la fecha de hoy
                    $filename = time() . "-" . $file->getClientOriginalName();
                    $uploadSuccess = $file->move($path, $filename);
                    $attendance->departure_image = $path . "/" . $filename;

                } else {
                    // Retornar error si la imagen no existe
                    return response()->json(['message' => 'Se requiere una imagen']);
                }

                // Guardamos los cambios en la base de datos
                $attendance->save();

                // Retornamos la respuesta en formato JSON
                return response()->json(['attendance' => $attendance]);

            } else {
                // Retornar error de marcado de asistencia
                return response()->json(['error' => 'Ya marcaste asistencia']);
            }
        }
    }



    // public function editUnavailableDays()
    // {
    //     $user = Auth::user();
    //     $unavailableDays = $user->unavailable_days ?? [];

    //     return view('unavailable-days.edit', compact('unavailableDays'));
    // }

    // public function updateUnavailableDays(Request $request)
    // {
    //     $user = Auth::user();
    //     $user->update([
    //         'unavailable_days' => $request->input('unavailable_days', []),
    //     ]);
    //     //Se puede agregar una notificación acá

    //     return redirect()->route('unavailable-days.edit');
    // }
}