<?php

namespace App\Http\Controllers;

use App\Models\Holiday;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    // Función para obtener todos los registros de feriados
    public function showAllHoliday()
    {
        $holidays = Holiday::all();

        return response()->json(['data' => $holidays]);
    }

    // Función para obtener un registro de feriado por su ID
    public function showHoliday($id)
    {
        $holiday = Holiday::find($id);

        if (!$holiday) {
            return response()->json(['message' => 'Feriado no encontrado'], 404);
        }

        return response()->json(['data' => $holiday]);
    }

    // Función para crear un nuevo registro de feriado
    public function createHoliday(Request $request)
    {
        $requestData = $request->validate([
            'date' => 'required|date'
        ]);
      
        $holiday = Holiday::create($requestData);

        return response()->json(['message' => 'Feriado creado exitosamente', 'data' => $holiday], 201);
    }

    // Función para actualizar un registro de feriado por su ID
    public function updateHoliday(Request $request, $id)
    {
        $requestData = $request->validate([
            'date' => 'required|date'
        ]);

        $holiday = Holiday::find($id);

        if (!$holiday) {
            return response()->json(['message' => 'Feriado no encontrado'], 404);
        }

        $holiday->update($requestData);
        return response()->json(['message' => 'Feriado actualizado exitosamente', 'data' => $holiday]);
    }

    // Función para eliminar un registro de feriado por su ID
    public function destroyHoliday($id)
    {
        $holiday = Holiday::find($id);

        if (!$holiday) {
            return response()->json(['message' => 'Feriado no encontrado'], 404);
        }

        $holiday->delete();

        return response()->json(['message' => 'Feriado eliminado exitosamente']);
    }
}
