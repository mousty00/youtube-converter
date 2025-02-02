import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-[80%] text-center">
        <div className="flex justify-center w-full">
          <Image
            src="/logo2.svg"
            alt="logo"
            width={400}
            height={200}
            layout="intrinsic"
          />
        </div>
        <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-50">
          Welcome to our website!
        </h1>
        <div className="text-center text-gray-300">
          <p>
            We make it easy to convert YouTube videos into high-quality MP3 audio files.
            <br />
            Whether you are looking to save your favorite music, podcasts, or any
            other content, <br /> our platform ensures the best possible sound
            quality for your conversions.
            <br />
            This project was born out of fun and passion for music and
            technology—enjoy!
          </p>
        </div>
      </div>
    </main>
  );
}