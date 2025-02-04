<?php

namespace App\Http\Controllers;

use App\Jobs\ConvertVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class JobController
{
    private $downloadFolder;

    public function __construct()
    {
        $this->downloadFolder = storage_path('app/static/downloads');

        if (! File::exists($this->downloadFolder)) {
            File::makeDirectory($this->downloadFolder, 0777, true);
        }
    }

    public function convert(Request $request)
    {
        $url = $request->input('url');
        $format = $request->input('format');
        $downloadFolder = $this->downloadFolder;

        if (! $url || ! $format) {
            return response()->json(['error' => 'Invalid or missing URL or format'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $job = new ConvertVideo($url, $format, $downloadFolder, 1);
            $job->handle();
            $jobId = $job->getJobId();

            return response()->json([
                'message' => 'Video conversion job started successfully',
                'jobId' => $jobId,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to dispatch conversion job'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Video conversion job started successfully']);

    }

    public function test($id)
    {
        return response()->json(['id' => $id]);
    }
}
