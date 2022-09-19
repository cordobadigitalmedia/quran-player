import React, { useState, useEffect } from "react";
import Image from "next/future/image";

const quranImage =
  "https://res.cloudinary.com/quran-adel/image/upload/v1662666252/quran/pages/";

export default function QuranPage({ page }) {
  const [currentPage, setCurrentPage] = useState(page);
  console.log(page);
  let lines = {};
  page.verses.forEach((verse, v) => {
    verse.words.forEach((word, w) => {
      if (lines[word.line_number]) {
        if (lines[word.line_number][verse.verse_number]) {
          lines[word.line_number][verse.verse_number].push(word.text_uthmani);
        } else {
          lines[word.line_number][verse.verse_number] = new Array();
          lines[word.line_number][verse.verse_number].push(word.text_uthmani);
        }
      } else {
        lines[word.line_number] = new Object();
        lines[word.line_number][verse.verse_number] = new Array();
        lines[word.line_number][verse.verse_number].push(word.text_uthmani);
      }
    });
  });
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  return (
    <div dir="rtl">
      {Object.keys(lines).map((line) => (
        <div
          key={lines[line]}
          className="font-arabic text-2xl text-black flex gap-x-2"
        >
          {Object.keys(lines[line]).map((verse) => (
            <span
              key={lines[line][verse]}
              className="hover:border hover:border-[#00000] hover:cursor-pointer flex flex-auto gap-x-1 p-2"
            >
              {lines[line][verse].map((item) => (
                <span key={item} className="flex-auto">
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
