interface VideoDetails {
  url: string;
  videoId: string;
  videoTitle: string;
}

interface VideoPlayer {
  videoDetails: VideoDetails;
  message: string;
}

export default function VideoPlayer({ videoDetails, message }: VideoPlayer) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <p className="text-lg text-center">{message}</p>
      <iframe
        className="h-[200px] w-full"
        src={`https://www.youtube.com/embed/${videoDetails?.videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope;"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
      <button
        className="px-6 py-3 w-full bg-purpleCustom text-white font-semibold rounded-lg uppercase hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => document.location.reload()}
      >
        Convert Another
      </button>
    </div>
  );
}
