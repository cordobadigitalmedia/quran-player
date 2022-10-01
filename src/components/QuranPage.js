import React, { useState, useEffect } from "react";
import Image from "next/future/image";

const quranImage =
  "https://res.cloudinary.com/quran-adel/image/upload/v1662666252/quran/pages/";

export default function QuranPage({ page, chapters, pageNo }) {
  const [currentPage, setCurrentPage] = useState(page);
  console.log(chapters, page);
  let lines = {};
  page.verses.forEach((verse, v) => {
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
  console.log(pageNo);
  if (pageNo > 2) {
    for (let p = 1; p <= 15; p++) {
      if (!lines[p] && !lines[p + 1]) {
        lines[p] = new Object();
        lines[p][1] = new Array();
        console.log(lines[p + 2][1]);
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
  console.log(lines);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  return (
    <div dir="rtl">
      {Object.keys(lines).map((line) => (
        <div
          key={lines[line]}
          className="font-arabic text-2xl text-black flex justify-between grow"
        >
          {Object.keys(lines[line]).map((verse) => (
            <span
              key={lines[line][verse]}
              className="hover:border hover:border-[#00000] hover:cursor-pointer flex grow"
            >
              {lines[line][verse].map((item) => (
                <span
                  key={item}
                  className={
                    item.type === "verse"
                      ? `flex grow items-stretch`
                      : `text-center grow`
                  }
                >
                  {item.word}
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
