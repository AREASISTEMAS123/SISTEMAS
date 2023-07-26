<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('attendance_reports', function (Blueprint $table) {
            $table->id();
            $table->integer('attendances');
            $table->integer('delays');
            $table->integer('absences');
            $table->integer('justifications');
            $table->integer('total');
            $table->string('shift');
            $table->date('date');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
