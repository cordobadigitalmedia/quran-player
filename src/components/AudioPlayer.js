import React, { useState, useEffect, useRef } from "react";

const audioRoot = "https://quran-abdullah-adel.s3.eu-central-1.amazonaws.com/";

export default function AudioPlayer({ audioSrc = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef(
    typeof Audio !== "undefined" && new Audio(`${audioRoot}${audioSrc}`)
  );
  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        setIsPlaying(false);
        setTrackProgress(0);
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };
  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };
  const sToTime = (t) => {
    return (
      padZero(parseInt((t / (60 * 60)) % 24)) +
      ":" +
      padZero(parseInt((t / 60) % 60)) +
      ":" +
      padZero(parseInt(t % 60))
    );
  };
  const padZero = (v) => {
    return v < 10 ? "0" + v : v;
  };
  return (
    <div className="flex w-full text-gray-10 h-8">
      {isPlaying ? (
        <div onClick={() => setIsPlaying(false)}>
          <svg
            width="21"
            height="26"
            className="h-7 w-7 cursor-pointer"
            viewBox="0 0 21 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.81333 0C4.82469 0 5.79463 0.456546 6.50977 1.2692C7.22491 2.08186 7.62667 3.18406 7.62667 4.33333V21.6667C7.62667 22.8159 7.22491 23.9181 6.50977 24.7308C5.79463 25.5435 4.82469 26 3.81333 26C2.80197 26 1.83204 25.5435 1.1169 24.7308C0.40176 23.9181 2.13128e-08 22.8159 0 21.6667V4.33333C0 3.18406 0.40176 2.08186 1.1169 1.2692C1.83204 0.456546 2.80197 0 3.81333 0V0ZM16.5244 0C17.5358 0 18.5057 0.456546 19.2209 1.2692C19.936 2.08186 20.3378 3.18406 20.3378 4.33333V21.6667C20.3378 22.8159 19.936 23.9181 19.2209 24.7308C18.5057 25.5435 17.5358 26 16.5244 26C15.5131 26 14.5431 25.5435 13.828 24.7308C13.1129 23.9181 12.7111 22.8159 12.7111 21.6667V4.33333C12.7111 3.18406 13.1129 2.08186 13.828 1.2692C14.5431 0.456546 15.5131 0 16.5244 0Z"
              fill="#E2E2E2"
            />
          </svg>
        </div>
      ) : (
        <div onClick={() => setIsPlaying(true)}>
          <svg
            className="h-7 w-7 cursor-pointer"
            viewBox="0 0 21 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 13L0 25.1244V0.875645L21 13Z" fill="#E2E2E2" />
          </svg>
        </div>
      )}
      <div className="text-gray-100 w-16 px-2 pt-1 text-sm">{`${sToTime(
        trackProgress
      )}`}</div>
      <input
        type="range"
        value={trackProgress}
        step="1"
        min="0"
        max={duration ? duration : `${duration}`}
        className="relative h-2 mt-2.5 mb-1 bg-slate-300 flex flex-grow mx-4 cursor-pointer"
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={onScrubEnd}
        onKeyUp={onScrubEnd}
      />
    </div>
  );
}
