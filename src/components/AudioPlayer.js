import React, { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const audioRoot = "https://quran-adel.s3.eu-central-1.amazonaws.com/";

export default function AudioPlayer({ audioSrc, playStatus, onPlayEnd }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef(new Audio(`${audioRoot}${audioSrc}`));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  useEffect(() => {
    if (isPlaying) {
      if (audioSrc !== "") {
        audioRef?.current.play();
        startTimer();
      }
    } else {
      clearInterval(intervalRef.current);
      if (audioSrc !== "" || playStatus === false) {
        audioRef?.current.pause();
      }
    }
  }, [isPlaying, audioSrc, playStatus]);

  useEffect(() => {
    audioRef.current.pause();
    if (audioSrc !== "") {
      audioRef.current = new Audio(`${audioRoot}${audioSrc}`);
      if (isReady.current) {
        audioRef.current.play();
        audioRef.current.pa;
        setIsPlaying(true);
        startTimer();
      } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true;
      }
    }
  }, [audioSrc, playStatus]);

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
        onPlayEnd("");
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
    <div className="flex w-full text-gray-10 h-6">
      {isPlaying ? (
        <div onClick={() => setIsPlaying(false)}>
          <PauseIcon className="h-7 w-7 cursor-pointer text-white rtl rotate-180" />
        </div>
      ) : (
        <div onClick={() => setIsPlaying(true)}>
          <PlayIcon className="h-7 w-7 cursor-pointer text-white rtl rotate-180" />
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
