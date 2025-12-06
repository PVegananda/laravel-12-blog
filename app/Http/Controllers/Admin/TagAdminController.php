<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tags/Index', [
            'tags' => Tag::latest()->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tags/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $data['slug'] = Str::slug($data['name']);

        Tag::create($data);

        return redirect()->route('admin.tags.index')->with('success', 'Tag dibuat.');
    }

    public function edit(Tag $tag)
    {
        return Inertia::render('Admin/Tags/Edit', [
            'tag' => $tag
        ]);
    }

    public function update(Request $request, Tag $tag)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $data['slug'] = Str::slug($data['name']);

        $tag->update($data);

        return redirect()->route('admin.tags.index')->with('success', 'Tag diupdate.');
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()->route('admin.tags.index')->with('success', 'Tag dihapus.');
    }
}
