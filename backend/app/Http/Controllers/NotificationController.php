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

    public function getNotificationid($id){
        $notif = Notification::find($id);
        if(is_null($notif)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        return response()->json($notif::find($id),200);
    }

    public function insertNotification(Request $request){

        $userCounter = User::all()->count();
        $notifications = [];
    
        for($id = 1; $id <= $userCounter; $id++) {
            $absence = Attendance::all()->where('user_id', $id)->where('absence', '1')->count();
            if ($absence === 3) {
                $notif = Notification::create(['id', 'notifiable_id'=>$id, 'data'=> 'Este usuario tiene 3 faltas']);
                array_push($notifications, $notif);
            } else if ($absence === 2) {
                array_push($notifications, "El usuario con ID " . $id . " tiene 2 faltas");
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
    }


    public function deleteNotification(Request $request,$id){
        $notif = Notification::find($id);
        if(is_null($notif)){
            return response()->json(['Mensaje'=>'No encontrado'],404);
        }
        $notif -> delete();
        return response()->json(['Mensaje'=>'Eliminado Correctamente'],200);
    }

}
