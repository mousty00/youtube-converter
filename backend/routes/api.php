<?php

use App\Http\Controllers\YouTubeController;
use Illuminate\Support\Facades\Route;

Route::post('/convert', [YouTubeController::class, 'convert']);
Route::post('/download', [YouTubeController::class, 'download']);
Route::post('/delete_file', [YouTubeController::class, 'deleteFile']);
Route::post('/extractVideo', [YouTubeController::class, 'extractVideo']);
