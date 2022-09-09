import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import QuranPage from "../src/components/QuranPage";
import Link from "next/link";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon,
  PauseIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import TopBar from "../src/components/TopBar";

const maxPages = 3;

const Page = (quran) => {
  const router = useRouter();
  const { page } = router.query;
  const pageData = quran.page;
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  const updatePlayStatus = (status) => {
    setIsPlaying(status);
  };
  return (
    <div>
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <div className="h-screen sm:h-full flex items-center justify-center">
        <div className="max-w-2xl mx-auto pt-10 pb-20">
          {page && (
            <QuranPage
              page={page}
              updatePlay={updatePlayStatus}
              playStatus={isPlaying}
            />
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <div className="bg-[#222C50] text-slate-500 dark:bg-slate-600 dark:text-slate-200 flex items-center justify-center">
          <div className="flex-auto flex items-center max-w-2xl px-2">
            <Link
              href={Number(page) > 1 ? `${Number(page) - 1}` : `#`}
              passHref
            >
              <button
                type="button"
                aria-label="Next"
                className="flex flex-grow justify-start"
              >
                <ChevronLeftIcon className="h-9 w-9 cursor-pointer text-white mb-2" />
              </button>
            </Link>
            <div className="flex">
              <button
                type="button"
                className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -mt-2 mb-2 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label="Pause"
              >
                {isPlaying ? (
                  <PauseIcon className="h-9 w-9 cursor-pointer text-slate" />
                ) : (
                  <PlayIcon className="h-9 w-9 cursor-pointer text-slate" />
                )}
              </button>
              <Link href="/" passHref>
                <button type="button" aria-label="List">
                  <ListBulletIcon className="h-9 w-9 cursor-pointer text-white mb-2 ml-2" />
                </button>
              </Link>
            </div>
            <Link
              href={Number(page) < maxPages ? `${Number(page) + 1}` : `#`}
              passHref
            >
              <button
                type="button"
                aria-label="Previous"
                className="flex flex-grow justify-end"
              >
                <ChevronRightIcon className="h-9 w-9 cursor-pointer text-white mb-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: "1" } },
      { params: { page: "2" } },
      { params: { page: "3" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  if (params.page) {
    const res = await fetch(
      `https://api.quran.com/api/v4/quran/verses/uthmani?page_number=${params.page}`
    );
    const data = await res.json();
    return {
      props: { quran: data },
    };
  }
}

export default Page;
