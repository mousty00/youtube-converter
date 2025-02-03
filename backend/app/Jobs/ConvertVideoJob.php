<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class ConvertVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;

    protected $format;

    protected $videoId;

    protected $videoTitle;

    public function __construct($url, $format, $videoId, $videoTitle)
    {
        $this->url = $url;
        $this->format = $format;
        $this->videoId = $videoId;
        $this->videoTitle = $videoTitle;
    }

    /**
     * @return void
     */
    public function handle()
    {
        $downloadFolder = storage_path('app/static/downloads');
        if (! File::exists($downloadFolder)) {
            File::makeDirectory($downloadFolder, 0777, true);
        }

        try {
            $uniqueFilename = uniqid();
            $outputTemplate = $downloadFolder.'/'.$uniqueFilename.'.%(ext)s';

            $command = "yt-dlp -f bestaudio --extract-audio --audio-format mp3 --output \"$outputTemplate\" \"$this->url\"";
            $videoTitle = shell_exec($command);
            $videoTitle = trim($videoTitle);

            $mp3FilePath = $downloadFolder.'/'.$videoTitle.'.mp3';
            $commandDownload = "yt-dlp -f bestaudio --extract-audio --audio-format mp3 --output \"$mp3FilePath\" \"$this->url\"";
            shell_exec($commandDownload);

            if (File::exists($mp3FilePath)) {
                Log::debug("File converted successfully: $videoTitle");

            } else {
                Log::error('MP3 file not found after conversion');
            }
        } catch (\Exception $e) {
            Log::error('Error during video conversion: '.$e->getMessage());
        }
    }
}
