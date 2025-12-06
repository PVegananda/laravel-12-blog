<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostAdminController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\CategoryAdminController;
use App\Http\Controllers\Admin\TagAdminController;
use App\Http\Controllers\Api\PostController;

use App\Http\Controllers\Front\PageController;
use App\Http\Controllers\Front\PostFrontController;

/*
|--------------------------------------------------------------------------
| PUBLIC FRONTEND
|--------------------------------------------------------------------------
*/

// Homepage
Route::get('/', function () {
    return Inertia::render('Home', [
        'posts' => \App\Models\Post::orderBy('created_at', 'desc')
            ->take(6)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'title' => $p->title,
                'slug' => $p->slug,
                'thumbnail_url' => $p->thumbnail 
                    ? asset('storage/' . $p->thumbnail)
                    : null,
                'created_at' => $p->created_at,
            ]),
    ]);
})->name('home');

// About page
Route::get('/about', [PageController::class, 'about'])->name('about');

// All posts (list)
Route::get('/posts', [PostFrontController::class, 'index'])->name('posts.index');

// Single post detail
Route::get('/posts/{slug}', [PostFrontController::class, 'show'])->name('posts.show');


/*
|--------------------------------------------------------------------------
| ADMIN LOGIN & REDIRECT
|--------------------------------------------------------------------------
*/

// Login page
Route::get('/admin/login', function () {
    return Inertia::render('Admin/Login');
})->name('admin.login');

// Auto redirect /admin
Route::get('/admin', function () {
    if (Auth::check() && Auth::user()->is_admin) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('admin.login');
})->name('admin.redirect');


/*
|--------------------------------------------------------------------------
| ADMIN PROTECTED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'isAdmin'])
    ->prefix('admin')
    ->as('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        Route::resource('posts', PostAdminController::class);
        Route::post('/posts/bulk-delete', [PostAdminController::class, 'bulkDelete'])
            ->name('posts.bulk-delete');

        Route::get('/profile', [AdminProfileController::class, 'index'])->name('profile');
        Route::put('/profile', [AdminProfileController::class, 'update'])->name('profile.update');

        Route::resource('categories', CategoryAdminController::class);
        Route::resource('tags', TagAdminController::class);
    });


/*
|--------------------------------------------------------------------------
| PUBLIC API (Frontend)
|--------------------------------------------------------------------------
*/

// Route::prefix('api')->group(function () {
//     Route::get('/posts', [PostController::class, 'index']);
//     Route::post('/posts', [PostController::class, 'store']);
// });


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
