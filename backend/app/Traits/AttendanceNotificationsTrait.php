<?php

namespace App\Traits;

use App\Models\User;
use App\Notifications\AdminNotifications;

trait AttendanceNotificationTrait {
    public function sendNotification($user, $faltasCount)
    {
        // Obtén los usuarios que tienen el role_id de gerencia (1) y Lider Departamento (2)
        $adminAndModeratorUsers = User::whereHas('roles', function ($query) {
            $query->whereIn('role_id', [1, 2]);
        })->get();

        // Crea la notificación para cada usuario y envíala
        foreach ($adminAndModeratorUsers as $adminOrModerator) {
            $adminOrModerator->notify(new AdminNotifications($user, $faltasCount));
        }
    }
}