<?php

namespace App\Providers;

use App\Events\VideoConverted;
use App\Listeners\SendConversionResponse;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $listen = [
        VideoConverted::class => [
            SendConversionResponse::class,
        ],
    ];

    /**
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
