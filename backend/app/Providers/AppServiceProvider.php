<?php
namespace App\Providers;
use App\Observers\AttendanceObserver;
use Illuminate\Support\ServiceProvider;
use App\Models\Attendance;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */

    public function boot()
    {
        Schema::defaultStringLength(191);
       // Attendance::observe(AttendanceObserver::class);
    }


}

