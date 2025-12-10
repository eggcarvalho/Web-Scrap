<?php

use App\Http\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::get("/checkout/{slug}", [CheckoutController::class, "index"]);
