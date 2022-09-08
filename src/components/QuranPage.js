import React, { useState, useEffect, useRef } from "react";

const quranImage =
  "https://res.cloudinary.com/duisewapt/image/upload/v1662666252/quran/pages/";
const quranAudio =
  "https://res.cloudinary.com/duisewapt/video/upload/v1662610449/quran/audio/";

export default function QuranPage({ page }) {
  const audioRef = useRef(
    typeof Audio !== "undefined"
      ? new Audio(`${quranAudio}${page}.mp3`)
      : undefined
  );
  const prevAudioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    prevAudioRef.current = page;
    if (!audioRef.current) {
      audioRef.current?.load();
      audioRef.current = new Audio(`${quranAudio}${page}.mp3`);
    }
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    console.log(prevAudioRef.current, page);
  }, [isPlaying, page]);

  const playAudio = () => {
    setIsPlaying(!isPlaying);
    console.log("play page: " + page);
  };
  return (
    <div className="-mt-[50px] -mb-[60px]">
      <img
        onClick={() => playAudio()}
        className="mx-auto hover:cursor-pointer"
        src={`${quranImage}${page}.jpg`}
        alt="Quran page"
      />
    </div>
  );
}
