import React, { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const quranAudio =
  "https://res.cloudinary.com/duisewapt/video/upload/v1662610449/quran/audio/";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}

export default function AudioPlayer({ page }) {
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
    if (!audioRef.current || prevPage !== currentPage) {
      audioRef.current?.load();
      audioRef.current = new Audio(`${quranAudio}${currentPage}.mp3`);
    }
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentPage, page, prevPage]);

  return (
    <div
      className="flex flex-grow cursor:pointer"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <button
        type="button"
        className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -mt-2 mb-2 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
        aria-label="Pause"
      >
        {isPlaying ? (
          <PauseIcon className="h-9 w-9 cursor-pointer text-slate" />
        ) : (
          <PlayIcon className="h-9 w-9 cursor-pointer text-slate" />
        )}
      </button>
    </div>
  );
}
