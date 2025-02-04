<?php

namespace App\Listeners;

use App\Events\VideoConverted;
use Illuminate\Http\JsonResponse;

class SendConversionResponse
{
    /**
     * @param  \App\Events\VideoConverted
     * @return JsonResponse
     */
    public function handle(VideoConverted $event)
    {
        if ($event->status == 'success') {
            return response()->json([
                'status' => 'success',
                'message' => $event->message,
                'videoId' => $event->videoId,
                'videoTitle' => $event->videoTitle,
                'filePath' => $event->filePath,
            ]);
        } else {
            return response()->json([
                'error' => $event->message,
            ], 400);
        }
    }
}
