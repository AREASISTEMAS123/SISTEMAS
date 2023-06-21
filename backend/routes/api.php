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

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function (){



    Route::get('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/birthday', [\App\Http\Controllers\BirthdayController::class, 'getbirthday']);
    Route::get('/birthday/details', [\App\Http\Controllers\BirthdayController::class, 'detailsbirthday']);

    Route::get('/task', [\App\Http\Controllers\UserTaskController::class, 'gettask']);
    Route::get('/task/{id}', [\App\Http\Controllers\UserTaskController::class, 'gettaskid']);
    Route::post('/task/insert', [\App\Http\Controllers\UserTaskController::class,'insertTask']);
    Route::put('/task/update/{id}', [\App\Http\Controllers\UserTaskController::class,'updateTask']);
    Route::delete('/task/delete/{id}', [\App\Http\Controllers\UserTaskController::class,'deleteTask']);

    Route::get('/attendance', [\App\Http\Controllers\AttendanceController::class, 'getattendance']);


    Route::get('/user',[App\Http\Controllers\usercontroller::class, 'getUser']);
    Route::get('/user/{id}','App\Http\Controllers\usercontroller@getUserxid');
    Route::post('/addUser','App\Http\Controllers\usercontroller@insertUser');
    Route::put('/updateUser/{id}','App\Http\Controllers\usercontroller@updateUser');
    Route::delete('/deleteUser/{id}','App\Http\Controllers\usercontroller@deleteUser');
});



