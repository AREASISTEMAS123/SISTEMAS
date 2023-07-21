<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;


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
        $notif = Notification::create($request->all());
        return response($notif,201);
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
