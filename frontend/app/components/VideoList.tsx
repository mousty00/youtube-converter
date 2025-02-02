import { RiDeleteBin2Fill } from "react-icons/ri";
import Image from "next/image";

interface Video {
  url: string;
  videoId: string;
  videoTitle: string;
}

interface VideoListProps {
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
}

export default function VideoList({ videos, setVideos }: VideoListProps) {
  const removeVideo = (videoId: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      setVideos((prevVideos) => prevVideos.filter((video) => video.videoId !== videoId));
    }
  };

  return (
    <ol className="space-y-4">
      {videos.map((video) => (
        <li key={video.videoId} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg hover:bg-gray-100">
          <Image
            src={`http://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
            title={video.videoTitle}
            alt={video.videoTitle}
            className="rounded-md"
            width={120}
            height={90}
          />
          <p className="flex-1 text-lg font-semibold text-gray-800">{video.videoTitle}</p>
          <RiDeleteBin2Fill
            size={40}
            color="red"
            onClick={() => removeVideo(video.videoId)}
            className="cursor-pointer hover:text-red-600 transition duration-200"
          />
        </li>
      ))}
    </ol>
  );
}
