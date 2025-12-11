<?php

use App\Models\Product;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table("checkouts", function (Blueprint $table) {
            $table->foreignIdFor(Product::class)->after('id')->constrained()->restrictOnDelete();
        });

        Schema::table('products', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
        Schema::table("checkouts", function (Blueprint $table) {
            $table->dropForeign(["product_id"]);
            $table->dropColumn(["product_id"]);
        });
    }
};
