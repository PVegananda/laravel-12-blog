<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostAdminController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\CategoryAdminController;
use App\Http\Controllers\Admin\TagAdminController;


// =============================
// PUBLIC: Homepage
// =============================
Route::get('/', function () {
    return Inertia::render('Home');
});

// LOGIN ADMIN (public)
Route::get('/admin', function () {
    return Inertia::render('Admin/Login');
});

// =============================
// ADMIN AREA (Protected)
// PREFIX: /admin
// NAME PREFIX: admin.
// =============================
Route::middleware(['auth', 'isAdmin'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // Posts CRUD
        Route::resource('posts', PostAdminController::class);

        // Bulk delete
        Route::post('posts/bulk-delete', [PostAdminController::class, 'bulkDelete'])
            ->name('posts.bulk-delete');

        // Profile
        Route::get('/profile', [AdminProfileController::class, 'index'])
            ->name('profile');

        Route::put('/profile', [AdminProfileController::class, 'update'])
            ->name('profile.update');

        // Categories CRUD
        Route::resource('categories', CategoryAdminController::class);

        // Tags CRUD
        Route::resource('tags', TagAdminController::class);
    });

// =============================
// PUBLIC POSTS API
// =============================
Route::get('/posts', [PostController::class, 'index']);
Route::post('/posts', [PostController::class, 'store']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
