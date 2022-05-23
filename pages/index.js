import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "../src/components/AudioPlayer";

const pageRoot = "https://quran-images-api.herokuapp.com/show/page/";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(151);
  return (
    <div>
      <Head>
        <title>Quran Recitation</title>
        <meta name="description" content="Recitation by Abdullah Adel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-[#E9D8BE]">
        <div className="flex justify-center justify-items-stretch p-2 bg-[#120000] text-white fixed top-0 left-0 right-0 drop-shadow-md">
          <div className="w-full lg:w-[1024px] flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className="pl-2 flex flex-grow justify-center text-lg md:text-xl lg:text-2xl truncate">
              تلاوة القرآن بصوت عبدالله عادل
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div
          id="scrolling-content"
          className="flex p-2 justify-center pt-14 pb-32"
        >
          <div className="lg:max-w-screen-lg max-w-full flex-shrink-0">
            <img
              src={`${pageRoot}${currentPage}`}
              alt={`Page ${currentPage}`}
            />
          </div>
        </div>
        <div className="flex justify-center p-2 fixed bottom-12 left-0 right-0 bg-[#E9D8BE] text-xl drop-shadow-[0_-2px_5px_rgba(0,0,0,0.15)]">
          {`الأعراف | صفحة ${currentPage}`}
        </div>
        <div className="flex justify-center p-2 bg-[#120000] fixed bottom-0 left-0 right-0">
          <div className="w-full lg:w-[1024px] flex">
            <AudioPlayer audioSrc="07.mp3" />
          </div>
        </div>
      </div>
    </div>
  );
}
