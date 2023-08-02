<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Justification;
use App\Models\Model_has_role;
use App\Models\Profile;
use App\Models\User;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;
use PhpParser\Node\NullableType;
use function PHPUnit\Framework\isNull;

class JustificationController extends Controller
{
    public function insertJustification(Request $request)
    {
        $rules = array(

            'justification_date' => 'required|date',
            'justification_type' => 'required',
            'reason' => 'required|string',
            'evidence' => 'required',

        );
        $messages = array(
            'evidence.required' => 'Por favor ingrese un archivo que evidencie la justificacion',
            'justification_type.required' => 'Por favor ingrese el tipo de justificacion',
            'reason.required' => 'Por favor ingrese una breve descripcion de la justificacion',
            'justification_date.required' => 'Por favor ingrese una fecha para la justificacion',

        );

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            $messages = $validator->messages();
            return response()->json(["messages" => $messages], 500);
        }

        try {
            DB::beginTransaction();
            $justification = new Justification;
            $justification->reason = $request->get('reason');
            $justification->user_id = auth()->id();
            $justification->justification_date = $request->get('justification_date');
            $justification->justification_type = $request->get('justification_type');

            if ($request->hasFile('evidence')) {
                $archivo = $request->file('evidence');
                $archivo->move(public_path() . '/archivos/', $archivo->getClientOriginalName());
                $justification->evidence = $archivo->getClientOriginalName();
            }
            $justification->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return response()->json(['Datos' => $justification, 'messages' => 'La justificacion ha sido subido con exito']);
    }

    public function getJustification()
    {

        $justification = Justification::with('user:id,name,surname')->where('user_id', Auth::user()->id)->get();
        $img = Auth::user()->getMedia('avatars')->first()->getUrl('thumb');
        return response()->json(['Justificaciones' => $justification, "foto" => $img], 200);
    }
    
    public function getJustificationById($id)
    {
        $justification = Justification::with('User')->where('id', $id)->get();
        return response()->json($justification);
    }

    public function getAllJustification()
    {
        $justification = Justification::with('User.media', 'Profile')->get();
        $declines = Justification::all()->where('decline', '1')->count();
        $process = Justification::all()->where('justification_status', '0')->count();
        $accept = Justification::all()->where('justification_status', '1')->count();

        return response()->json([
            'Justifications' => $justification,
            'rechazados' => $declines,
            'proceso' => $process,
            'aceptados' => $accept
        ]);
    }

    public function detailsJustification($id)
    {
        $justification = Justification::with('User.role', 'User.Profile')->where('id', $id)->get();
        return response()->json($justification);
    }

    public function acceptJustification($id, $userid)
    {
        $actionByUserId = auth()->id();

        $justification = Justification::where('id', $id)->firstOrFail();
        $date = Carbon::now()->format('Y-m-d');
        $att = Attendance::where('user_id', $userid)->where('date', $date)->exists();

        if ($att) {
            $att = Attendance::where('user_id', $userid)->where('date', $date)->firstOrFail();

            if ($att->user_id == $userid && $att->date == $date) {
                if ($justification->justification_type == '0') {
                    $att->update([
                        'attendance' => '0',
                        'absence' => '1',
                        'justification' => '1',

                    ]);
                    $justification->update(['justification_status' => '1', 'action_by' => $actionByUserId]);

                    return response()->json(["message" => "Justificacion aceptada con exito"]);
                } else {
                    $att->update([
                        'justification' => '1',

                    ]);
                    $justification->update(['justification_status' => '1', 'action_by' => $actionByUserId]);

                    return response()->json(["message" => "Justificacion aceptada con exito"]);
                }
            }
        } else {

            if ($justification->justification_type == '0') {
                $attendance = Attendance::create([
                    'user_id' => $userid,
                    'absence' => '1',
                    'justification' => '1',
                    'date' => $justification->justification_date
                ]);
                $justification->update(['justification_status' => '1', 'action_by' => $actionByUserId]);
                return response()->json(["message" => "Justificacion aceptada con exito"]);
            } else {
                $attendance = Attendance::create([
                    'user_id' => $userid,
                    'delay' => '1',
                    'justification' => '1',
                    'date' => $justification->justification_date
                ]);
                $justification->update(['justification_status' => '1', 'action_by' => $actionByUserId]);

                return response()->json(["message" => "Justificacion aceptada con exito"]);
            }
        }
    }

    public function declineJustification(Request $request, $id, $userid)
    {
        $actionByUserId = auth()->id();
        $validator = Validator::make($request->all(), [
            'reason_decline' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $justification = Justification::where('id', $id)->firstOrFail();
        $date = Carbon::now();
        $date = $date->format('Y-m-d');
        $att = Attendance::where('user_id', $userid)->where('date', $date)->exists();

        if ($att == 'true') {
            $att = Attendance::where('user_id', $userid)->where('date', $date)->firstOrFail();
            if ($att->user_id == $userid && $att->date == $date) {
                if ($justification->justification_type == '0') {

                    $justification->update([
                        'decline' => '1',
                        'reason_decline' => $request->reason_decline,
                        'action_by' => $actionByUserId
                    ]);

                    return response()->json(["message" => "Justificacion rechazada"]);
                } else {

                    $justification->update([
                        'decline' => '1',
                        'reason_decline' => $request->reason_decline,
                        'action_by' => $actionByUserId
                    ]);

                    return response()->json(["message" => "Justificacion rechazada"]);
                }

            }
        } else {
            if ($justification->justification_type == '0') {
                $attendance = Attendance::create([
                    'user_id' => $userid,
                    'absence' => '1',
                    'date' => $justification->justification_date
                ]);
                $justification->update([
                    'decline' => '1',
                    'reason_decline' => $request->reason_decline,
                    'action_by' => $actionByUserId
                ]);

                return response()->json(["message" => "Justificacion rechazada"]);
            } else {
                $attendance = Attendance::create([
                    'user_id' => $userid,
                    'delay' => '1',
                    'date' => $justification->justification_date
                ]);
                $justification->update([
                    'decline' => '1',
                    'reason_decline' => $request->reason_decline,
                    'action_by' => $actionByUserId
                ]);

                return response()->json(["message" => "Justificacion rechazada"]);
            }

        }

    }
}