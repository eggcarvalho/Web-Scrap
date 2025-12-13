<?php

namespace Database\Seeders;

use App\Models\Lead;
use Illuminate\Database\Seeder;

class LeadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Desabilitar checks de chave estrangeira para permitir o truncate
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        Lead::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        Lead::factory(50)->create();
    }
}
