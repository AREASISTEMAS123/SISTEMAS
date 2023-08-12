<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\User;

class NotificationController extends Controller
{
    public function getNotification(){
        return response()->json(Notification::all(), 200);
    }

    /*public function getNotificationid($id){
        $notif = Notification::find($id);
        if(is_null($notif)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        return response()->json($notif::find($id),200);
    }

    public function insertNotification(){

        $userCounter = User::all()->count();
        $notifications = [];


        for($id = 1; $id <= $userCounter; $id++) {
            $absence = Attendance::all()->where('user_id', $id)->where('absence', '1')->where('justification','0')->count();

            if ($absence === 3) {
                // Verificamos si ya existe una notificación para este usuario con 3 faltas
                if (!Notification::where('user_id', $id)->where('data', 'Este usuario tiene 3 faltas')->exists()) {
                    $notif = Notification::create(['user_id'=>$id, 'data'=> 'Este usuario tiene 3 faltas y ha sido deshabilitado']);
                    array_push($notifications, $notif);
                    // Cambia el status del usuario a 0
                    User::where('id', $id)->update(['status' => 0]);
                }
            } else if ($absence === 2) {
                // Verificamos si ya existe una notificación para este usuario con 2 faltas
                if (!Notification::where('user_id', $id)->where('data', 'Este usuario tiene 2 faltas')->exists()) {
                    $notif = Notification::create(['user_id'=>$id, 'data'=> 'Este usuario tiene 2 faltas']);
                    array_push($notifications, $notif);
                }
            }
        }


        return response()->json(['notificaciones' => $notifications]);
    }

    public function updateNotification(Request $request,$id){
        $notif = Notification::find($id);
        if(is_null($notif)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        $notif -> update($request->all());
        return response($notif,200);
    }*/

    public function deleteNotification(Request $request,$id){
        $notif = Notification::find($id);
        if(is_null($notif)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        $notif -> delete();
        return response()->json(['Mensaje'=>'Eliminado Correctamente'],200);
    }

}
/*
class TwoFailsNotification extends Notification
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('Tienes 2 faltas. Por favor, contáctanos para más información.')
            ->action('Ir al sitio', url('/'))
            ->line('Gracias por usar nuestra aplicación.');
    }
}

class BirthdayNotification extends Notification
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('¡Feliz cumpleaños!')
            ->action('Ir al sitio', url('/'))
            ->line('Esperamos que tengas un excelente día.');
    }
}
