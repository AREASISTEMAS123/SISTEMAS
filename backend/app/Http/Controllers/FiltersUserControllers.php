<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class FiltersUserControllers extends Controller
{



    public function filterUsers($department = null, $area = null, $shift = null, $search = null) {
        $query = Profile::with(["User.media", "role"]);

        if ($department !== null && $department !== 'N-A') {
            $query->where('department', $department);
        }

        if ($area !== null && $area !== 'N-A') {
            $query->where('area', $area);
        }

        if ($shift !== null) {
            if ($shift === 'Mañana' || $shift === 'Tarde') {
                $query->where('shift', $shift);
            }
        }

        if ($search !== null) {
            $query->where(function ($innerQuery) use ($search) {
                $innerQuery->whereHas('User', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('surname', 'LIKE', '%' . $search . '%');
                });
            });
        }

        $profile = $query->orderBy('id', 'desc')->paginate(5);

        return response()->json([
            'profile' => $profile
        ]);
    }




}
