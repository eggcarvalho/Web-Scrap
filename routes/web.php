<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\Facades\Route;

Route::middleware(HandleInertiaRequests::class)->group(function () {
    Route::get("/checkout/{order_id}/status", [CheckoutController::class, "show"]);
    Route::get("/checkout/{slug}", [CheckoutController::class, "index"]);
    Route::post("/checkout", [CheckoutController::class, "store"]);

    // Auth Routes
    Route::get('/login', [\App\Http\Controllers\AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [\App\Http\Controllers\AdminAuthController::class, 'login']);
    Route::post('/logout', [\App\Http\Controllers\AdminAuthController::class, 'logout'])->name('logout');

    // Admin Routes
    Route::middleware('auth')->group(function () {
        Route::get('/admin', function () {
            return Inertia\Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');

        // Collaborators Routes
        Route::get('/admin/collaborators', [\App\Http\Controllers\CollaboratorController::class, 'index'])->name('admin.collaborators.index');
        Route::get('/admin/collaborators/create', [\App\Http\Controllers\CollaboratorController::class, 'create'])->name('admin.collaborators.create');
        Route::post('/admin/collaborators', [\App\Http\Controllers\CollaboratorController::class, 'store'])->name('admin.collaborators.store');
        Route::get('/admin/collaborators/{collaborator}/edit', [\App\Http\Controllers\CollaboratorController::class, 'edit'])->name('admin.collaborators.edit');
        Route::put('/admin/collaborators/{collaborator}', [\App\Http\Controllers\CollaboratorController::class, 'update'])->name('admin.collaborators.update');
        Route::delete('/admin/collaborators/{collaborator}', [\App\Http\Controllers\CollaboratorController::class, 'destroy'])->name('admin.collaborators.destroy');

        // Products Routes
        Route::resource('/admin/products', \App\Http\Controllers\ProductController::class)->names('admin.products');

        // Orders Routes
        Route::get('/admin/orders', [\App\Http\Controllers\AdminOrderController::class, 'index'])->name('admin.orders.index');
        Route::put('/admin/orders/{order}', [\App\Http\Controllers\AdminOrderController::class, 'update'])->name('admin.orders.update');
    });
});
