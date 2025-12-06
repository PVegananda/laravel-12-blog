<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostFrontController extends Controller
{
    /**
     * LIST SEMUA ARTIKEL
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        $posts = Post::query()
            ->with(['category', 'tags'])
            ->when($search, function ($q) use ($search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(9)
            ->withQueryString()
            ->through(fn ($post) => [
                'id'            => $post->id,
                'slug'          => $post->slug,
                'title'         => $post->title,
                'excerpt'       => mb_strimwidth(strip_tags($post->content), 0, 160, '...'),
                'created_at'    => $post->created_at?->format('Y-m-d H:i:s'),
                'thumbnail_url' => $post->thumbnail 
                    ? asset('storage/' . ltrim($post->thumbnail, '/'))
                    : null,
                'category'      => $post->category?->name,
            ]);

        return Inertia::render('Posts/Index', [
            'posts'   => $posts,
            'filters' => [
                'search' => $search ?? '',
            ],
        ]);
    }

    /**
     * DETAIL ARTIKEL
     */
    public function show($slug)
    {
        $post = Post::with(['category', 'tags'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Posts/Show', [
            'post' => [
                'id'            => $post->id,
                'slug'          => $post->slug,
                'title'         => $post->title,
                'content'       => $post->content,
                'created_at'    => $post->created_at?->format('Y-m-d H:i:s'),
                'thumbnail_url' => $post->thumbnail
                    ? asset('storage/' . ltrim($post->thumbnail, '/'))
                    : null,
                'category'      => $post->category?->name,
                'tags'          => $post->tags->map(fn ($t) => [
                    'id'   => $t->id,
                    'name' => $t->name,
                ]),
            ],
        ]);
    }
}
