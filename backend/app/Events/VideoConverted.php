<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VideoConverted
{
    use Dispatchable, SerializesModels;

    public $status;

    public $message;

    public $videoId;

    public $videoTitle;

    public $filePath;

    public $jobId;

    /**
     * Create a new event instance.
     *
     * @param  string  $status
     * @param  string  $message
     * @param  string  $videoId
     * @param  string  $videoTitle
     * @param  string  $filePath
     * @param  string  $jobId
     */
    public function __construct($status, $message, $videoId, $videoTitle, $filePath, $jobId)
    {
        $this->status = $status;
        $this->message = $message;
        $this->videoId = $videoId;
        $this->videoTitle = $videoTitle;
        $this->filePath = $filePath;
        $this->jobId = $jobId;
    }

    public function broadcastOn()
    {
        return new Channel('video-conversion.'.$this->jobId);
    }

    public function broadcastAs()
    {
        return 'video-converted';
    }
}
