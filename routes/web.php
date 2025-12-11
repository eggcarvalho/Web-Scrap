<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Route;

Route::middleware(HandleInertiaRequests::class)->group(function () {
    Route::get("/checkout/{slug}", [CheckoutController::class, "index"]);
    Route::post("/checkout", [CheckoutController::class, "store"]);
});
