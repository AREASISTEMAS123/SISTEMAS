<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\AttendanceReport;
use Illuminate\Http\Request;

class ReportController extends Controller
{
        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function totalReport() 
     {
         // Obtener el primer registro de la tabla attendances
         $attendance = Attendance::first();
 
         if(!$attendance) {
             return response()->json(['error' => 'No attendance data found'], 404);
         }
 
         $reportData = [
             'attendance' => $attendance->attendance,
             'absence' => $attendance->absence,
             'justification' => $attendance->justification,
             'delay' => $attendance->delay,
             'non_working_days' => $attendance->non_working_days,
             'date' => $attendance->date,
         ];
         
         return response()->json([
             'attendances' => $reportData,
         ]);
 
     }
 
     public function index()
     {
         $reports = AttendanceReport::all();
         return response()->json($reports);
     }
 
     /**
      * Store a newly created resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      */
     public function store(Request $request)
     {
         $reports = AttendanceReport::all();
         return response()->json($reports);
     }
 
     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
         $report = AttendanceReport::findOrFail($id);
         return response()->json($report);
     }
 
     /**
      * Update the specified resource in storage.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function update(Request $request, $id)
     {
         //
     }
 
     /**
      * Remove the specified resource from storage.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function destroy($id)
     {
         //
     }
}
