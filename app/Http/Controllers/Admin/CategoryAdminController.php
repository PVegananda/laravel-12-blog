<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CategoryAdminController extends Controller
{
    /**
     * Display list of categories
     */
    public function index()
    {
        return Inertia::render('Admin/Categories/Index', [
            'categories' => Category::latest()->paginate(10)
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    /**
     * Store new category
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $data['slug'] = Str::slug($data['name']);

        Category::create($data);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil dibuat.');
    }

    /**
     * Show edit form
     */
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update category
     */
    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $data['slug'] = Str::slug($data['name']);

        $category->update($data);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil diperbarui.');
    }

    /**
     * Delete category
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Kategori berhasil dihapus.');
    }
}
