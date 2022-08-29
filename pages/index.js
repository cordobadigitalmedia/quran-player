import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "../src/components/AudioPlayer";
import useSWR from "swr";

const pageRoot = "https://quran-images-api.herokuapp.com/show/page/";
const quranAPI =
  "https://api.quran.com/api/v4/quran/verses/uthmani?page_number=";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const [currentPage, setCurrentPage] = useState(151);
  const { data, error } = useSWR(`${quranAPI}${currentPage}`, fetcher);
  const [currentSrc, setCurrentSrc] = useState();
  const [currentId, setCurrentId] = useState("7_1");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const playVerse = (id) => {
    const idParts = id.split(":");
    let src;
    if (Number(idParts[1]) < 10) {
      src = `00${idParts[0]}0${idParts[1]}.mp3`;
    } else {
      src = `00${idParts[0]}${idParts[1]}.mp3`;
    }
    setCurrentId(id);
    setCurrentSrc(src);
    console.log(src);
  };

  const findVerseStart = (verses) => {
    const startVerse = verses[0].verse_key.split(":")[1]
      ? Number(verses[0].verse_key.split(":")[1])
      : 1;
    return startVerse;
  };

  return (
    <>
      <Head>
        <title>Quran Recitation</title>
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
                d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
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
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
        </div>
        <div
          id="scrolling-content"
          className="flex p-2 justify-center pt-14 pb-32"
        >
          <div className="lg:max-w-screen-lg max-w-full flex-shrink-0 hover:cursor-pointer group touch-auto:cursor-pointer">
            {data.verses.length > 0 && (
              <ul start={findVerseStart(data.verses)}>
                {data.verses.map((verse, i) => {
                  return (
                    <li
                      key={verse.verse_key}
                      className={`border-solid ${
                        currentId === verse.verse_key
                          ? `border-2 bg-white`
                          : `border-0`
                      } border-indigo-600 rounded-lg p-2 hover:bg-slate-200 flex`}
                      onClick={(e) => playVerse(verse.verse_key)}
                    >
                      <span className="bg-indigo-600 text-white rounded-full pt-2 pb-1 ml-2 text-base flex items-center self-start mt-2 justify-center h-7 max-w-[30px] w-full">
                        {verse.verse_key.split(":")[1]}
                      </span>
                      <span className="text-3xl leading-relaxed">
                        {verse.text_uthmani}
                      </span>
                    </li>
                  );
                })}
              </ul>
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
    </>
  );
}
