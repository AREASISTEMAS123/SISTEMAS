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
        Schema::create('profile', function (Blueprint $table){
            $table-> id();
            $table-> string('profile_name');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table-> string('dni')->nullable();
            $table-> string('cellphone')->nullable();
            $table-> string('department');
            $table-> string('area');
            $table->string('shift');
            $table-> string('cod_agreement');
            $table->date('date_start');
            $table->date('date_end');


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
