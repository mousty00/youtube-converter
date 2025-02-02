<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateYouTubeUrl
{
    /**
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $url = $request->input('youtubeUrl');

        if ($url && ! preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/', $url)) {
            return response()->json([
                'error' => 'Invalid YouTube URL.',
            ], 400);
        }

        return $next($request);
    }
}
