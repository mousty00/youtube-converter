"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Form from "../../../components/Form";
import VideoList from "../../../components/VideoList";
import VideoPlayer from "../../../components/VideoPlayer";
import Loader from "../../../components/Loader";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  url: string;
}

interface VideoDetails {
  title: string;
  description: string;
  url: string;
}

export default function MainApp() {
  const [loading, setLoading] = useState<boolean>(false);
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [isConverted, setIsConverted] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const titleText = useMemo(() => {
    if(loading) return "Loading"
    if (isConverted && isDownloaded) {
      return "Downloaded!";
    }
    return (
      <div className="w-72">
        <Image
          src="/title_converter.svg"
          alt="title"
          width={300}
          height={150}
          priority={true}
        />
      </div>
    );
  }, [loading, isConverted, isDownloaded]);

  const handleFormActions = useCallback(
    (
      setVideoDetails: React.Dispatch<
        React.SetStateAction<VideoDetails | null>
      >,
      setIsConverted: React.Dispatch<React.SetStateAction<boolean>>,
      setIsDownloaded: React.Dispatch<React.SetStateAction<boolean>>,
      setMessage: React.Dispatch<React.SetStateAction<string>>,
      setVideos: React.Dispatch<React.SetStateAction<Video[]>>,
      setListVisible: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      return {
        setLoading,
        setVideoDetails,
        setIsConverted,
        setIsDownloaded,
        setMessage,
        videos,
        setVideos,
        setListVisible,
      };
    },
    [videos]
  );

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-6xl font-bold text-center mb-8">{titleText}</h1>
      {!loading ? (
        <div hidden={isDownloaded} className="w-full">
          <Form
            {...handleFormActions(
              setVideoDetails,
              setIsConverted,
              setIsDownloaded,
              setMessage,
              setVideos,
              setListVisible
            )}
          />
          {listVisible && (
            <VideoList
              videos={videos}
              setVideos={setVideos}
              className="mt-4 max-w-full"
            />
          )}
        </div>
      ) : (
        <Loader />
      )}
      {isConverted && isDownloaded && (
        <div className="mt-8 flex flex-col items-center">
          <VideoPlayer videoDetails={videoDetails} message={message} />
        </div>
      )}
    </main>
  );
}
