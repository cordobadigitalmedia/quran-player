import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "../src/components/AudioPlayer";
import useSWR from "swr";

const pageRoot = "https://quran-images-api.herokuapp.com/show/page/";
const quranAPI =
  "https://api.quran.com/api/v4/quran/verses/uthmani?page_number=";
//Get page text in uthmani like https://api.quran.com/api/v4/quran/verses/uthmani?page_number=151
//Display text using CSS to display as close as page as possible
//Highlight verse based on css block id same as audio file

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const [currentPage, setCurrentPage] = useState(151);
  const { data, error } = useSWR(`${quranAPI}${currentPage}`, fetcher);
  const [currentSrc, setCurrentSrc] = useState("");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const playVerse = (id) => {
    const idParts = id.split(":");
    const src = `00${idParts[0]}0${idParts[1]}.mp3`;
    setCurrentSrc(src);
    //setCurrentSrc(`00${idParts[0]}0${idParts[1]}.mp3`);
    console.log(`00${idParts[0]}0${idParts[1]}.mp3`);
  };

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
          <div className="lg:max-w-screen-lg max-w-full flex-shrink-0 hover:cursor-pointer group touch-auto:cursor-pointer">
            <div className="inset-1/2 fixed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 sm:h-64 sm:w-64 text-blue-500 -left-16 -top-16 sm:-left-32 sm:-top-32 absolute hidden group-hover:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {data.verses.length > 0 && (
              <div className="flex flex-wrap flex-row gap-x-5 gap-y-2">
                {data.verses.map((verse) => {
                  return (
                    <div
                      key={verse.verse_key}
                      className="flex-initial"
                      onClick={(e) => playVerse(verse.verse_key)}
                    >
                      {verse.verse_key} {verse.text_uthmani}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center p-2 fixed bottom-12 left-0 right-0 bg-[#E9D8BE] text-xl drop-shadow-[0_-2px_5px_rgba(0,0,0,0.15)]">
          {`الأعراف | صفحة ${currentPage}`}
        </div>
        <div className="flex justify-center p-2 bg-[#120000] fixed bottom-0 left-0 right-0">
          <div className="w-full lg:w-[1024px] flex">
            <AudioPlayer audioSrc={currentSrc} />
          </div>
        </div>
      </div>
    </div>
  );
}
