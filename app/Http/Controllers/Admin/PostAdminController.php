<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostAdminController extends Controller
{
    /**
     * INDEX
     */
    public function index(Request $request)
    {
        $search     = $request->query('search');
        $categoryId = $request->query('category');
        $tagId      = $request->query('tag');
        $status     = $request->query('status');
        $sort       = $request->query('sort', 'created_at');
        $direction  = $request->query('dir', 'desc');
        $perPage    = (int) $request->query('per_page', 10);

        $query = Post::with('category', 'tags');

        if (in_array($sort, ['title', 'created_at', 'status'])) {
            $query->orderBy($sort, $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($tagId) {
            $query->whereHas('tags', fn($q) => $q->where('tags.id', $tagId));
        }

        if (in_array($status, ['published', 'draft'])) {
            $query->where('status', $status);
        }

        $posts = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts->through(fn($post) => [

                'id'         => $post->id,
                'title'      => $post->title,
                'slug'       => $post->slug,
                'created_at' => $post->created_at,
                'status'     => $post->status,

                // ✅ FIX BUG 3 — Pastikan path tidak menjadi storage/storage/file.jpg
                'thumbnail_url' => $post->thumbnail
                    ? asset('storage/' . ltrim(str_replace('storage/', '', $post->thumbnail), '/'))
                    : null,

                'category' => $post->category ? [
                    'id'   => $post->category->id,
                    'name' => $post->category->name,
                ] : null,

                'tags' => $post->tags->map(fn($t) => [
                    'id'   => $t->id,
                    'name' => $t->name,
                ]),
            ]),

            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'tags'       => Tag::orderBy('name')->get(['id', 'name']),
            'filters'    => [
                'search'   => $search,
                'category' => $categoryId,
                'tag'      => $tagId,
                'status'   => $status,
                'sort'     => $sort,
                'dir'      => $direction,
                'per_page' => $perPage,
            ],
        ]);
    }



    /**
     * BULK DELETE
     */
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);

        if (!is_array($ids) || empty($ids)) {
            return back()->with('error', 'Tidak ada post yang dipilih.');
        }

        try {
            $posts = Post::whereIn('id', $ids)->get();

            foreach ($posts as $post) {
                if ($post->thumbnail) {
                    Storage::disk('public')->delete($post->thumbnail);
                }
            }

            Post::whereIn('id', $ids)->delete();

            return back()->with('success', count($ids) . ' post berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus post.');
        }
    }


    /**
     * CREATE PAGE
     */
    public function create()
    {
        return Inertia::render('Admin/Posts/Create', [
            'categories' => Category::select('id', 'name')->get(),
            'tags'       => Tag::select('id', 'name')->get(),
        ]);
    }


        /**
     * STORE — FIX BUG 2 (pesan success)
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required',
            'content'     => 'nullable|string',
            'thumbnail'   => 'nullable|image|max:5120',
            'status'      => 'required|in:published,draft',
            'category_id' => 'nullable|exists:categories,id',
            'tags'        => 'array',
            'tags.*'      => 'exists:tags,id',
        ]);

        try {
            if ($request->hasFile('thumbnail')) {
                $data['thumbnail'] = $request->file('thumbnail')
                    ->store('thumbnails', 'public');
            }

            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);

            $tags = $data['tags'] ?? [];
            unset($data['tags']);

            $post = Post::create($data);

            if (!empty($tags)) {
                $post->tags()->attach($tags);
            }

            // ✅ FIX BUG 2 — Kata “diperbarui” diganti “dibuat”
            return redirect()
                ->route('admin.posts.index')
                ->with('success', 'Post berhasil dibuat!');

        } catch (\Exception $e) {
            return back()->with('error', 'Gagal membuat post.')->withInput();
        }
    }



    /**
     * EDIT PAGE
     */
    public function edit(Post $post)
    {
        $post->thumbnail_url = $post->thumbnail
            ? asset("storage/{$post->thumbnail}")
            : null;

        return Inertia::render('Admin/Posts/Edit', [
            'post'       => $post->load(['category', 'tags']),
            'categories' => Category::select('id', 'name')->get(),
            'tags'       => Tag::select('id', 'name')->get(),
        ]);
    }


    /**
     * UPDATE
     */
    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title'       => 'required',
            'content'     => 'nullable|string',
            'thumbnail'   => 'nullable|image|max:5120',
            'status'      => 'required|in:published,draft',
            'category_id' => 'nullable|exists:categories,id',
            'tags'        => 'array',
            'tags.*'      => 'exists:tags,id',
        ]);

        try {
            if ($request->hasFile('thumbnail')) {
                // Hapus thumbnail lama
                if ($post->thumbnail) {
                    Storage::disk('public')->delete($post->thumbnail);
                }

                $data['thumbnail'] = $request->file('thumbnail')
                    ->store('thumbnails', 'public');
            } else {
                // Jika tidak upload gambar baru, gunakan gambar lama
                $data['thumbnail'] = $post->thumbnail;
            }


            if ($post->title !== $data['title']) {
                $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);
            }

            $tags = $data['tags'] ?? [];
            unset($data['tags']);

            $post->update($data);
            $post->tags()->sync($tags);

            return redirect()->route('admin.posts.index')->with('success', 'Post updated!');


        } catch (\Exception $e) {
            return back()->with('error', 'Gagal memperbarui post.')->withInput();
        }
    }


    /**
     * DELETE
     */
    public function destroy(Post $post)
    {
        try {
            if ($post->thumbnail) {
                Storage::disk('public')->delete($post->thumbnail);
            }

            $post->tags()->detach();
            $post->delete();

            return redirect()->route('admin.posts.index')
                ->with('success', 'Post berhasil dihapus.');

        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus post.');
        }
    }


    /**
     * TOGGLE STATUS
     */
    public function toggleStatus(Post $post)
    {
        try {
            $post->status = $post->status === 'published' ? 'draft' : 'published';
            $post->save();

            return response()->json([
                'success' => true,
                'message' => 'Status berhasil diubah.',
                'status' => $post->status,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengubah status.',
            ], 500);
        }
    }
}
