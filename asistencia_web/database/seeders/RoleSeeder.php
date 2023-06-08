<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $role1 = Role::create(['name' => 'Gerencia']);
       $role2 = Role::create(['name' => 'Departamento']);
       $role3 = Role::create(['name' => 'Area']);
       $role4 = Role::create(['name' => 'Colaborador']);

       Permission::create(['name' => 'dashboard'])->assignRole($role1);
    }
}
