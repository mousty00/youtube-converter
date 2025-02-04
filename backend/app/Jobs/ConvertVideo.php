<?php

namespace App\Jobs;

use App\Events\VideoConverted;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ConvertVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $url;

    public $format;

    public $downloadFolder;

    public $jobId;

    public function __construct($url, $format, $downloadFolder, $jobId = null)
    {
        $this->url = $url;
        $this->format = $format;
        $this->downloadFolder = $downloadFolder;
        $this->jobId = $jobId;
    }

    public function getJobId()
    {
        return $this->jobId;
    }

    public function handle()
    {
        $this->deleteAllFilesInDownloads();

        $url = $this->url;
        $format = $this->format;

        if (! $url || ! $format) {
            Log::error('Invalid or missing URL or format');

            return;
        }

        try {
            $videoId = $this->extractVideoIdFromUrl($url);

            if (! $videoId) {
                Log::error('Invalid YouTube URL');

                return;
            }

            $videoTitle = shell_exec("yt-dlp --get-title \"$url\"");
            $videoTitle = trim($videoTitle);

            if (empty($videoTitle)) {
                $videoTitle = $videoId;
            }

            $downloadFolder = storage_path('app/public/downloads');

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

                return;
            }

            $filePath = $downloadFolder.'/'.$videoId.'.'.$format;

            if (File::exists($filePath)) {
                Log::debug("File converted successfully: $videoTitle");
                event(new VideoConverted('success', 'Video converted successfully!', $videoId, $videoTitle, $filePath, $this->jobId));

            } else {
                Log::error('File not found after conversion: '.$filePath);
                event(new VideoConverted('error', 'File not found after conversion', $videoId, '', '', $this->jobId));
            }
        } catch (\Exception $e) {
            Log::error('Error during video conversion: '.$e->getMessage());
        }
    }

    private function extractVideoIdFromUrl($url)
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

    private function extractCommand($format, $outputTemplate, $url)
    {
        if ($format === 'mp3') {
            return "yt-dlp -f bestaudio --extract-audio --audio-format mp3 --output \"$outputTemplate\" \"$url\"";
        } elseif ($format === 'mp4') {
            return "yt-dlp -f bestvideo[height=720]+bestaudio --merge-output-format mp4 --output \"$outputTemplate\" \"$url\"";
        }
    }

    private function deleteAllFilesInDownloads()
    {
        $files = File::files($this->downloadFolder);
        foreach ($files as $file) {
            File::delete($file);
        }
    }
}
