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
    <div className="flex flex-col items-center justify-center">
      <iframe
        className="w-full h-96 md:h-[500px] lg:h-[600px] xl:h-[700px]"
        src={`https://www.youtube.com/embed/${videoDetails?.videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope;"
        allowFullScreen
        title="YouTube video player"
      ></iframe>
      <p className="mt-4 text-lg text-center">{message}</p>
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => document.location.reload()}
      >
        Convert Another
      </button>
    </div>
  );
}
