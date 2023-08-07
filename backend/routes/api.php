<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users/register', [\App\Http\Controllers\AuthController::class, 'register']);

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::post('password/create', [\App\Http\Controllers\Auth\PasswordResetController::class, 'create']);
Route::get('password/find/{token}', [\App\Http\Controllers\Auth\PasswordResetController::class, 'find']);
Route::post('password/reset', [\App\Http\Controllers\Auth\PasswordResetController::class, 'reset']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/notifications', [\App\Http\Controllers\NotificationController::class, 'insertNotification']);


    Route::get('/users/justifications', [\App\Http\Controllers\JustificationController::class, 'getAllJustification']);
    Route::get('/users/justifications/{id}', [\App\Http\Controllers\JustificationController::class, 'detailsJustification']);
    Route::post('/users/justifications/{id}/accept/{userid}', [\App\Http\Controllers\JustificationController::class, 'acceptJustification']);
    Route::post('/users/justifications/{id}/decline/{userid}', [\App\Http\Controllers\JustificationController::class, 'declineJustification']);

    Route::get('/users', [App\Http\Controllers\usercontroller::class, 'getUser']);
    Route::get('/users/{id}', [App\Http\Controllers\usercontroller::class, 'getUserById']);
    Route::put('/users/update/{id}', [\App\Http\Controllers\usercontroller::class, 'updateUser']);
    Route::delete('/users/delete/{id}', [App\Http\Controllers\usercontroller::class, 'deleteUser']);

    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'getProfile']);
    Route::post('/profile/changePassword', [App\Http\Controllers\ProfileController::class, 'change_password']);

    Route::get('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/birthday', [\App\Http\Controllers\BirthdayController::class, 'getbirthday']);
    Route::get('/birthday/details', [\App\Http\Controllers\BirthdayController::class, 'detailsbirthday']);

    Route::get('/task', [\App\Http\Controllers\UserTaskController::class, 'gettask']);
    Route::get('/task/{id}', [\App\Http\Controllers\UserTaskController::class, 'gettaskid']);
    Route::post('/task/insert', [\App\Http\Controllers\UserTaskController::class, 'insertTask']);
    Route::put('/task/update/{id}', [\App\Http\Controllers\UserTaskController::class, 'updateTask']);
    Route::delete('/task/delete/{id}', [\App\Http\Controllers\UserTaskController::class, 'deleteTask']);

    Route::get('justifications', [\App\Http\Controllers\JustificationController::class, 'getJustification']);
    Route::post('justifications/insert', [\App\Http\Controllers\JustificationController::class, 'insertJustification']);
    Route::get('justifications/details/{id}', [\App\Http\Controllers\JustificationController::class, 'getJustificationById']);

    Route::get('/attendance', [\App\Http\Controllers\AttendanceController::class, 'getattendance']);
    Route::post('/attendance/insert', [\App\Http\Controllers\AttendanceController::class, 'insertAttendance']);
    //Route::get('/attendance/order', [\App\Http\Controllers\AttendanceController::class, 'orderAttendance']);
    Route::get('/attendance/id', [\App\Http\Controllers\AttendanceController::class, 'getAttendanceByID']);
    Route::get('/attendance/report', [\App\Http\Controllers\AttendanceController::class, 'generateReport']);


    Route::get('notifications', [App\Http\Controllers\EvaluationController::class, 'getNotification']);
    Route::get('notification/details', [App\Http\Controllers\EvaluationController::class, 'detailsNotification']);

    Route::get('notification/{id}', [App\Http\Controllers\EvaluationController::class, 'getNotificationbyid']);

    Route::post('addNotificaction', [App\Http\Controllers\EvaluationController::class, 'insertNotificationn']);

    Route::put('updateNotificaction/{id}', [App\Http\Controllers\EvaluationController::class, 'updateNotification']);

    Route::delete('deleteNotificaction/{id}', [App\Http\Controllers\EvaluationController::class, 'deleteNotification']);

    Route::get('evaluations', [App\Http\Controllers\EvaluationController::class, 'getEvaluation']);

    Route::get('evaluations/softskills', [App\Http\Controllers\EvaluationController::class, 'getSoftSkills']);
    
    Route::get('evaluations/performance', [App\Http\Controllers\EvaluationController::class, 'getPerformance']);
    
    Route::get('evaluations/leadership', [App\Http\Controllers\EvaluationController::class, 'getLeadership']);

    Route::get('evaluations/autoevaluation', [App\Http\Controllers\EvaluationController::class, 'getAutoevaluation']);

    Route::get('evaluations/softskills/{id}', [App\Http\Controllers\EvaluationController::class, 'getSoftSkillsById']);

    Route::post('evaluations/softskills/{id}/update', [App\Http\Controllers\EvaluationController::class, 'updateSoftSkills']);

    Route::post('evaluations/performance/{id}/update', [App\Http\Controllers\EvaluationController::class, 'updatePerformance']);

    Route::post('evaluations/leadership/{id}/update', [App\Http\Controllers\EvaluationController::class, 'updateLeadership']);

    Route::post('evaluations/autoevaluation/{id}/update', [App\Http\Controllers\EvaluationController::class, 'updateAutoevaluation']);

    Route::get('evaluations/details/{id}', [App\Http\Controllers\EvaluationController::class, 'getEvaluationDetails']);

    //Route::get('evaluations/{id}', [App\Http\Controllers\EvaluationController::class, 'getEvaluationById']);

    Route::post('evaluations/insert/{id}', [App\Http\Controllers\EvaluationController::class, 'insertEvaluation']);
    Route::post('evaluations/average/{id}', [App\Http\Controllers\EvaluationController::class, 'calcAverage']);
});