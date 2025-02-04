<?php

namespace App\Http\Controllers;

use App\Jobs\ConvertVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class YouTubeController
{
    private $downloadFolder;

    public function __construct()
    {
        $this->downloadFolder = storage_path('app/static/downloads');

        if (! File::exists($this->downloadFolder)) {
            File::makeDirectory($this->downloadFolder, 0777, true);
        }
    }

    private function deleteAllFilesInDownloads()
    {
        $files = File::files($this->downloadFolder);
        foreach ($files as $file) {
            File::delete($file);
        }
    }

    public function download(Request $request)
    {
        $filepath = $request->input('filepath');

        if (File::exists($filepath)) {
            return response()->download($filepath);
        } else {
            Log::error('File not found: '.$filepath);

            return response()->json(['error' => 'File not found'], Response::HTTP_NOT_FOUND);
        }
    }

    public function extractVideoIdFromUrl($url)
    {
        $regex = '/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:(?:v|e(?:mbed)?)\/|(?:[^\/\n]+\/\S*?[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&].*)?$/';
        if (preg_match($regex, $url, $matches)) {
            Log::debug("Video ID extracted successfully: $matches[1]");

            return $matches[1];
        } else {
            Log::error('Video ID not found');

            return null;
        }
    }

    public function extractVideo(Request $request)
    {
        $url = $request->input('url');

        if (! $url) {
            return response()->json(['error' => 'Invalid or missing URL'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $command = "yt-dlp --get-title \"$url\"";
            $videoTitle = shell_exec($command);
            $videoTitle = trim($videoTitle);

            if (empty($videoTitle)) {
                return response()->json(['error' => 'Failed to fetch video title'], Response::HTTP_BAD_REQUEST);
            }

            return response()->json([
                'videoId' => $this->extractVideoIdFromUrl($url),
                'videoTitle' => $videoTitle,
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching video details: '.$e->getMessage());

            return response()->json(['error' => 'An error occurred while fetching video details'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function extractCommand($format, $outputTemplate, $url)
    {
        if ($format === 'mp3') {
            return "yt-dlp -f bestaudio --extract-audio --audio-format mp3 --output \"$outputTemplate\" \"$url\"";
        } elseif ($format === 'mp4') {
            return "yt-dlp -f bestvideo[height=720]+bestaudio --merge-output-format mp4 --output \"$outputTemplate\" \"$url\"";
        }

        return '';
    }

    public function convert(Request $request)
    {
        $this->deleteAllFilesInDownloads();

        $url = $request->input('url');
        $format = $request->input('format');

        if (! $url || ! $format) {
            return response()->json(['error' => 'Invalid or missing URL or format'], Response::HTTP_BAD_REQUEST);
        }

        try {
            $videoId = $this->extractVideoIdFromUrl($url);

            if (! $videoId) {
                return response()->json(['error' => 'Invalid YouTube URL'], Response::HTTP_BAD_REQUEST);
            }

            $videoTitle = shell_exec("yt-dlp --get-title \"$url\"");
            $videoTitle = trim($videoTitle);

            if (empty($videoTitle)) {
                $videoTitle = $videoId;
            }

            $downloadFolder = $this->downloadFolder;

            if (! File::exists($downloadFolder)) {
                File::makeDirectory($downloadFolder, 0777, true);
            }

            $outputTemplate = $downloadFolder.'/'.$videoId.'.'.$format;

            Log::debug('Converting video with format: '.$format);

            $commandExtract = $this->extractCommand($format, $outputTemplate, $url);

            Log::debug('Executing conversion command: '.$commandExtract);

            $conversion = shell_exec($commandExtract);
            $conversionOutput = trim($conversion);

            if (empty($conversionOutput)) {
                Log::error("yt-dlp conversion failed or no output received for video: $url");

                return response()->json(['error' => 'Failed to convert video'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $filePath = $downloadFolder.'/'.$videoId.'.'.$format;

            if (File::exists($filePath)) {
                Log::debug("File converted successfully: $videoTitle");

                return response()->json([
                    'status' => 'success',
                    'message' => 'Video converted successfully!',
                    'videoId' => $videoId,
                    'videoTitle' => $videoTitle,
                    'filePath' => $filePath,
                ]);
            } else {
                Log::error('File not found after conversion: '.$filePath);

                return response()->json(['error' => 'File not found after conversion'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (\Exception $e) {
            Log::error('Error during video conversion: '.$e->getMessage());

            return response()->json(['error' => 'Error during video conversion'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function convertJob(Request $request)
    {
        $url = $request->input('url');
        $format = $request->input('format');
        $downloadFolder = $this->downloadFolder;

        if (! $url || ! $format) {
            return response()->json(['error' => 'Invalid or missing URL or format'], Response::HTTP_BAD_REQUEST);
        }

        try {
            ConvertVideo::dispatch($url, $format, $downloadFolder);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to dispatch conversion job'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response()->json(['message' => 'Video conversion job started successfully']);

    }
}
