<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),

            // 🔥 FLASH MESSAGE (PENTING untuk TOAST)
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],

            // Existing props (biarkan tetap ada)
            'name' => config('app.name'),

            'quote' => [
                'message' => trim($message),
                'author'  => trim($author),
            ],

            'auth' => [
                'user' => $request->user(),
            ],

            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }

}
