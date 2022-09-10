import React, { useState, useEffect, useRef } from "react";

const quranImage =
  "https://res.cloudinary.com/duisewapt/image/upload/v1662666252/quran/pages/";
const quranAudio =
  "https://res.cloudinary.com/duisewapt/video/upload/v1662610449/quran/audio/";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

export default function QuranPage({ page, updatePlay, playStatus }) {
  const audioRef = useRef(
    typeof Audio !== "undefined"
      ? new Audio(`${quranAudio}${page}.mp3`)
      : undefined
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const prevPage = usePrevious(currentPage);

  useEffect(() => {
    setCurrentPage(page);
    setIsPlaying(playStatus);
    if (!audioRef.current || prevPage !== currentPage) {
      audioRef.current?.load();
      audioRef.current = new Audio(`${quranAudio}${currentPage}.mp3`);
    }
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentPage, page, playStatus, prevPage]);

  const playAudio = () => {
    const newPlayStatus = !isPlaying;
    setIsPlaying(newPlayStatus);
    updatePlay(newPlayStatus);
  };
  return (
    <div className="-mt-[50px] -mb-[60px]">
      <img
        className="mx-auto"
        src={`${quranImage}${currentPage}.jpg`}
        alt="Quran page"
      />
    </div>
  );
}
