<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class DownloadVideoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filepath;

    public function __construct($filepath)
    {
        $this->filepath = $filepath;
    }

    /**
     * @return void
     */
    public function handle()
    {
        if (File::exists($this->filepath)) {
            Log::debug("File downloaded successfully: $this->filepath");

        } else {
            Log::error('File not found for download: '.$this->filepath);
        }
    }
}
