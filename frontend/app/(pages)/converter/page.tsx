import Card from "@/app/components/Card";
import Link from "next/link";
import { JSX } from "react";
import { FaFile, FaYoutube, FaTiktok, FaInstagram , FaImage } from "react-icons/fa";

export default function Converter() {
  interface Route {
    title: string;
    description: string;
    href: string;
    icon: JSX.Element;
  }

  const routes: Route[] = [
    {
      title: "Youtube Videos",
      description: "Convert YouTube videos to your preferred format: Mp3, Mp4, Wav, M4a",
      href: "/converter/youtube",
      icon: <FaYoutube size={40} color="#8c52ff" />,
    },
    {
        title: "TikTok Videos",
        description: "Convert TikTok videos to your preferred format: Mp3, Mp4, Wav",
        href: "/converter/youtube",
        icon: <FaTiktok size={40} color="#8c52ff" />,
    },
    {
        title: "Instagram Reels",
        description: "Convert Instagram Reels to your preferred format: Mp3, Mp4",
        href: "/converter/youtube",
        icon: <FaInstagram size={40} color="#8c52ff" />,
    },
    {
      title: "Files",
      description: "Upload a file to convert",
      href: "/converter/file",
      icon: <FaFile size={40} color="#8c52ff"/>,
    },
    {
        title: "Images",
        description: "Upload an image to convert",
        href: "/converter/file",
        icon: <FaImage size={40} color="#8c52ff"/>,
      },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 gap-6 mt-10">
      <h1 className="text-6xl text-center font-bold">Converter</h1>
      <p>Choose what you want to convert</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center items-center w-[80%]">
        {routes.map((route, index) => (
          <div key={index} className="h-full">
            <Link href={route.href}>
              <Card title={route.title} icon={route.icon}>
                <p className="text-center w-[80%] mx-auto my-4">{route.description}</p>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
