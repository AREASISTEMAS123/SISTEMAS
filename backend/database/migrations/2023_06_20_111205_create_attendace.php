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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->timestamp('admission_time')->nullable();
            $table->timestamp('departure_time')->nullable();
            $table->string('image')->nullable();
            $table->boolean('absence')->default(false);
            $table->boolean('justification')->default(false);
            $table->timestamps();
        });

        Schema::create('justifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('attendances')->onDelete('cascade');
            $table->date('justification_date');
            $table->string('reason');
            $table->string('evidence');
            $table->boolean('justificacion_status')->default(false);
            $table->string('decline')->nullable();
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
        Schema::dropIfExists('attendace');
    }
};
