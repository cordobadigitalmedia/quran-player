import React, { useState, useEffect } from "react";
import Image from "next/future/image";

const quranImage =
  "https://res.cloudinary.com/quran-adel/image/upload/v1662666252/quran/pages/";

export default function QuranPage({ page, chapters, pageNo }) {
  const [currentPage, setCurrentPage] = useState(page);
  let lines = {};
  let pagetext = [];
  console.log(page);
  page.verses.forEach((verse, v) => {
    let currentVerse = verse.words.map((word) => word.text_uthmani);
    currentVerse.pop();
    pagetext.push({ type: "text", value: currentVerse.join(" ") });
    pagetext.push({
      type: "stop",
      value: verse.words[verse.words.length - 1].text_uthmani,
    });
    verse.words.forEach((word, w) => {
      if (lines[word.line_number]) {
        if (lines[word.line_number][verse.verse_number]) {
          lines[word.line_number][verse.verse_number].push({
            type: "verse",
            word: word.text_uthmani,
            chapter: verse.chapter_id,
          });
        } else {
          lines[word.line_number][verse.verse_number] = new Array();
          lines[word.line_number][verse.verse_number].push({
            type: "verse",
            word: word.text_uthmani,
            chapter: verse.chapter_id,
          });
        }
      } else {
        lines[word.line_number] = new Object();
        lines[word.line_number][verse.verse_number] = new Array();
        lines[word.line_number][verse.verse_number].push({
          type: "verse",
          word: word.text_uthmani,
          chapter: verse.chapter_id,
        });
      }
    });
  });
  //check if we need to add chapter title
  if (pageNo > 2) {
    for (let p = 1; p <= 15; p++) {
      if (!lines[p] && !lines[p + 1]) {
        lines[p] = new Object();
        lines[p][1] = new Array();
        lines[p][1].push({
          type: "title",
          word: `Sura ${lines[p + 2][1][0].chapter}`,
        });
        lines[p + 1] = new Object();
        lines[p + 1][1] = new Array();
        lines[p + 1][1].push({ type: "opening", word: "Bismillah" });
      }
    }
  }
  console.log(pagetext);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  return (
    <div
      dir="rtl"
      className="font-arabic text-2xl text-black text-justify leading-loose pt-[36px] pb-10 px-4"
    >
      {pagetext.map((verse) => (
        <span
          className={
            verse.type === "text"
              ? `transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 hover:cursor-pointer rounded`
              : `rounded-full border border-cyan-300 mx-[5px] px-[10px] text-base`
          }
        >
          {verse.value}
        </span>
      ))}
    </div>
  );
}
