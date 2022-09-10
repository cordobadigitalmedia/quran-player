import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import TopBar from "../src/components/TopBar";
import {
  CheckIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/router";

const featured = [18, 36, 56, 67];

const totalPages = 604;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const quranImage =
  "https://res.cloudinary.com/duisewapt/image/upload/v1662666252/quran/pages/";

export default function Home(chapterData) {
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
    pages.push({ id: p, name: `Page ${p}` });
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

  let featuredChapters = [];
  featured.forEach((item) => {
    featuredChapters.push({
      id: item,
      link: `/quran/${chapterData.chapterData.chapters[item - 1].pages[0]}`,
      name: chapterData.chapterData.chapters[item - 1].name_arabic,
      bgColor: "bg-[#222C50]",
    });
  });

  return (
    <>
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex flex-col items-center justify-center">
        <img src="/0.png" className="w-48 mt-4" />
        <div className="justify-center text-lg md:text-xl lg:text-2xl">
          تلاوة القرآن بصوت عبدالله عادل
        </div>
        <section>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
          >
            <li className="col-span-1 flex w-40">
              <Combobox as="div" value={selectedPage} onChange={gotoPage}>
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  By Page
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    onChange={(event) => setQuery1(event.target.value)}
                    displayValue={(page) => page?.name}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>

                  {filteredPages.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPages.map((page) => (
                        <Combobox.Option
                          key={page.id}
                          value={page}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  "block truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {page.name}
                              </span>

                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                    active ? "text-white" : "text-indigo-600"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </li>
            <li className="col-span-1 flex w-40">
              <Combobox as="div" value={selectedChapter} onChange={gotoPage}>
                <Combobox.Label className="block text-sm font-medium text-gray-700">
                  By Chapter
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    onChange={(event) => setQuery2(event.target.value)}
                    displayValue={(chapter) => chapter?.name_arabic}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>

                  {filteredChapters.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredChapters.map((chapter) => (
                        <Combobox.Option
                          key={chapter.id}
                          value={chapter}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pl-3 pr-9",
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  "block truncate",
                                  selected && "font-semibold"
                                )}
                              >
                                {chapter.id}. {chapter.name_arabic}
                              </span>

                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                    active ? "text-white" : "text-indigo-600"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  )}
                </div>
              </Combobox>
            </li>
          </ul>
        </section>
        <section className="mt-6 mb-10">
          <ul
            role="list"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
          >
            {featuredChapters.map((chapter) => (
              <a href={chapter.link} key={chapter.name}>
                <li className="col-span-1 flex rounded-md shadow-sm w-40">
                  <div
                    className={classNames(
                      chapter.bgColor,
                      "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                    )}
                  >
                    {chapter.id}
                  </div>
                  <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600">
                        {chapter.name}
                      </span>
                    </div>
                  </div>
                </li>
              </a>
            ))}
          </ul>
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
