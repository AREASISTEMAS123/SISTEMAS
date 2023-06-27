<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role1 = Role::create(['name' => 'Gerencia']);
        $role2 = Role::create(['name' => 'Lider Departamento']);
        $role3 = Role::create(['name' => 'Lider Area']);
        $role4 = Role::create(['name' => 'Colaborador']);
    }
}
