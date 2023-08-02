<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
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
            $table->time('admission_time')->nullable();
            $table->time('departure_time')->nullable();
            $table->string('admission_image')->nullable();
            $table->string('departure_image')->nullable();
            $table->boolean('attendance')->default(false);
            $table->boolean('absence')->default(false);
            $table->boolean('justification')->default(false);
            $table->boolean('delay')->default(false);
            $table->boolean('non_working_days')->default(false);
            $table->date('date');
            $table->timestamps();
        });

        Schema::create('justifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->boolean('justification_type')->default(false);
            $table->date('justification_date');
            $table->string('reason');
            $table->string('evidence');
            $table->boolean('justification_status')->default(false);
            $table->boolean('decline')->default(false);
            $table->string('reason_decline')->nullable();
            $table->timestamps();
            
            $table->unsignedBigInteger('action_by')->nullable();
            $table->foreign('action_by')->references('id')->on('profiles')->onDelete('set null');

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