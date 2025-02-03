import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiDownloadFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const MAX_LIMIT = 3;

interface Video {
  url: string;
  videoId: string;
  videoTitle: string;
}

interface FormProps {
  setLoading: (loading: boolean) => void;
  setVideoDetails: (details: {
    videoId: string;
    videoTitle: string;
    filepath: string;
  }) => void;
  setIsConverted: (isConverted: boolean) => void;
  setIsDownloaded: (isDownloaded: boolean) => void;
  setMessage: (message: string) => void;
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  setListVisible: (isVisible: boolean) => void;
}

interface FormData {
  youtubeUrl: string;
}

export default function Form({
  setLoading,
  setVideoDetails,
  setIsConverted,
  setIsDownloaded,
  setMessage,
  videos,
  setVideos,
  setListVisible,
}: FormProps) {
  const { register, handleSubmit } = useForm<FormData>();
  const [isAdding] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFormat, setSelectedFormat] = useState<string>("mp3");

  const validateYouTubeUrl = (url: string): boolean => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  useEffect(() => {
    const isValid = validateYouTubeUrl(youtubeUrl);
    setButtonDisabled(!isValid || !selectedFormat);
    setErrorMessage(isValid || youtubeUrl === "" ? "" : "Please enter a valid YouTube URL.");
  }, [youtubeUrl, selectedFormat]);

  const handleSelectedFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(e.target.value);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { youtubeUrl } = data;
    setLoading(true);
    setIsConverted(false);
    setIsDownloaded(false);

    if (!validateYouTubeUrl(youtubeUrl)) {
      setErrorMessage("Please enter a valid YouTube URL.");
      setLoading(false);
      return;
    } else if (!selectedFormat) {
      setErrorMessage("Please select a format.");
      setLoading(false);
      return;
    }

    try {
      const { data: videoData } = await axios.post<{
        videoId: string;
        videoTitle: string;
        filePath: string;
      }>(`${SERVER_URL}/api/convert`, { url: youtubeUrl, format: selectedFormat });

      setIsConverted(true);
      setIsDownloaded(false);
      setVideoDetails({
        videoId: videoData.videoId,
        videoTitle: videoData.videoTitle,
        filepath: videoData.filePath,
      });

      const { data: responseData } = await axios.post<Blob>(
        `${SERVER_URL}/api/download`,
        { filepath: videoData.filePath },
        { responseType: "blob" }
      );

      const blob = responseData;
      const link = document.createElement("a");
      const fileExtension = selectedFormat === "mp3" ? ".mp3" : ".mp4";
      link.href = URL.createObjectURL(blob);
      link.download = `${videoData.videoTitle}${fileExtension}`;
      link.click();

      setMessage("The download will start automatically...");
    } catch (error: unknown) {
      alert(error);
      setMessage("An error occurred during conversion.");
    } finally {
      setIsDownloaded(true);
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const addVideos = async (data: FormData) => {
    setLoading(true);
    setButtonDisabled(true);
    const { youtubeUrl } = data;

    if (videos.some((video) => video.url === youtubeUrl)) {
      alert("You already added this video");
      setLoading(false);
      setButtonDisabled(false);
      return;
    }

    try {
      const { data: responseData } = await axios.post<{
        videoId: string;
        videoTitle: string;
      }>(`${SERVER_URL}/api/extractVideo`, { url: youtubeUrl });
      const { videoId, videoTitle } = responseData;

      if (videos.length < MAX_LIMIT) {
        setVideos((prevVideos) => [
          ...prevVideos,
          { url: youtubeUrl, videoId, videoTitle },
        ]);
        setListVisible(true);
      } else {
        alert(`You can't convert more than ${MAX_LIMIT} videos!`);
      }
    } catch (error: unknown) {
      alert(error);
      setMessage("An error occurred while adding the video.");
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <form
      onSubmit={isAdding ? handleSubmit(addVideos) : handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full max-w-md mx-auto p-6 rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="YouTube video URL here..."
        {...register("youtubeUrl")}
        className="w-full bg-neutral-950 text-center px-4 py-2 rounded-lg focus:outline-none"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <div className="flex space-x-4">
        <select
          className="flex-1 px-4 bg-purpleCustom py-2 text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={selectedFormat}
          onChange={handleSelectedFormat}
        >
          <option value="mp3">MP3</option>
          <option value="mp4">MP4</option>
        </select>

        <button
          type="submit"
          className="flex items-center w-[50%] justify-center px-4 py-2 bg-purpleCustom text-white rounded-lg hover:bg-indigo-600 disabled:cursor-not-allowed transition-colors"
          disabled={buttonDisabled}
        >
          {isAdding ? (
            <>
              <p>Add</p>
              <IoMdAdd className="ml-2" />
            </>
          ) : (
            <>
              <p>Download</p>
              <RiDownloadFill className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}