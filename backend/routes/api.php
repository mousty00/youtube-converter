<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\YouTubeController;
use Illuminate\Support\Facades\Route;

Route::post('/download', [YouTubeController::class, 'download']);
Route::post('/delete_file', [YouTubeController::class, 'deleteFile']);
Route::post('/convert', [YouTubeController::class, 'convert']);
Route::post('/job-status/{id]', [JobController::class, 'getJobStatus']);
Route::get('/test/{id}', [JobController::class, 'test']);