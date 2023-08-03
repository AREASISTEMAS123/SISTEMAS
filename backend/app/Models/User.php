<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Spatie\Permission\Traits\HasRoles;

use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles;
    use InteractsWithMedia;


    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb');

    }


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'surname',
        'email',
        'password',
        'status',
    ];

    public function Profile(){

        return $this->belongsTo(Profile::class, 'id', 'user_id');
    }

    public function role(){
        return $this->hasMany(Model_has_role::class, 'model_id','id');
    }

    public function justification(){

        return $this->belongsTo(Justification::class, 'id', 'user_id');
    }

    // public function evaluations() {
    //     return $this->belongsTo(Evaluation::class, 'id', 'user_id');
    // }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
