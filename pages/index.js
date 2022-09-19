import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/router";
import arabicNumbers from "../src/utils/arabic-numbers";
import Image from "next/future/image";

const featured = [18, 36, 56, 67];

const totalPages = 604;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home(chapterData) {
  const [enabled, setEnabled] = useState(false);
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState();
  const [selectedChapter, setSelectedChapter] = useState();

  const gotoPage = (val) => {
    setSelectedPage(val);
    router.push(`/quran/${val.id}`);
  };

  let pages = [];
  for (let p = 1; p <= totalPages; p++) {
    pages.push({ id: p, name: `صفحة ${arabicNumbers(p)}` });
  }

  const filteredPages =
    query1 === ""
      ? pages
      : pages.filter((page) => {
          return page.name.toLowerCase().includes(query1.toLowerCase());
        });

  const filteredChapters =
    query2 === ""
      ? chapterData.chapterData.chapters
      : chapterData.chapterData.chapters.filter((chapter) => {
          return chapter.name_arabic
            .toLowerCase()
            .includes(query2.toLowerCase());
        });

  console.log(filteredChapters);
  let featuredChapters = [];
  featured.forEach((item) => {
    featuredChapters.push({
      id: item,
      link: `/quran/${chapterData.chapterData.chapters[item - 1].pages[0]}`,
      name: chapterData.chapterData.chapters[item - 1].name_arabic,
      bgColor: "bg-[#222C50]",
    });
  });
  const css = { maxWidth: "100%", height: "auto" };
  return (
    <>
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col h-full items-center bg-[#FAFBFD]">
        <Image
          style={css}
          className="w-40 mt-8"
          src="/home-logo.png"
          alt="Quran al Karim"
          width={169}
          height={97}
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
        <div className="font-sans mt-3 font-semibold justify-center text-xs">
          <span className="text-[#000513]">recited by</span>{" "}
          <span className="text-[#268F97]">Abdullah Adel</span>
        </div>
        <section>
          <div className="flex w-96 min-w-full border-[#C4C8CF] border rounded-full h-10 mt-4 bg-white">
            <MagnifyingGlassIcon className="ml-1.5 w-6 text-[#007C84]" />
            <input
              type="search"
              className="font-sans text-xs px-1 py-2 border-none flex-grow rounded-full"
              placeholder="Find by page/juz/sura number, chapter title or search term"
            />
          </div>
        </section>
        <section className="flex justify-center items-center mt-3">
          <div className="text-[#252E50] text-[11px] mr-2">
            By chapter/surah
          </div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-[#252E50]" : "bg-[#268F97]"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <div className="text-[#252E50] text-[11px] ml-2">By section/juz</div>
        </section>
        <section className="mt-6 mb-10">
          <div role="list" className="grid grid-cols-3 gap-4 lg:grid-cols-5">
            {filteredChapters.map((chapter) => (
              <a href={`/quran/${chapter.pages[0]}`} key={chapter.name_simple}>
                <div className="col-span-1 flex flex-col rounded-lg bg-white border-[#C4C8CF] border justify-center items-center p-1 hover:border-[#252E50] hover:cursor-pointer">
                  <div className="font-arabic text-[#252E50] mt-1 text-xl">
                    {chapter.name_arabic}
                  </div>
                  <div className="text-[#000513] font-semibold font-sans text-xs mt-1">
                    {chapter.translated_name.name}
                  </div>
                  <div className="text-[10px] text-[#646E84] font-sans text-xs mt-2">
                    {chapter.verses_count} verses
                  </div>
                  <div className="text-[10px] text-[#646E84] font-sans text-xs mb-1">
                    Pages {chapter.pages[0]}-{chapter.pages[1]}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://api.quran.com/api/v4/chapters`);
  const data = await res.json();
  return {
    props: { chapterData: data },
  };
}
