import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import QuranPage from "../../src/components/QuranPage";
import { useSwipeable, UP, DOWN, SwipeEventData } from "react-swipeable";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  PlayIcon,
  PauseIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";
import TopBar from "../../src/components/TopBar";

const maxPages = 3;
const totalPages = 604;

const Page = (quran) => {
  const router = useRouter();
  const { page } = router.query;
  const handleSwiped = (eventData) => {
    if (eventData.dir === "Right" && Number(currentPage) < maxPages) {
      setIsPlaying(false);
      router.push(`/quran/${Number(currentPage) + 1}`);
    }
    if (eventData.dir === "Left" && Number(currentPage) > 1) {
      setIsPlaying(false);
      router.push(`/quran/${Number(currentPage) - 1}`);
    }
  };

  const handlers = useSwipeable({
    onSwiped: handleSwiped,
    onTouchStartOrOnMouseDown: ({ event }) => event.preventDefault(),
    touchEventOptions: { passive: false },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

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
      <div
        className="h-screen sm:h-full flex items-center justify-center"
        {...handlers}
      >
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
            <div className="flex justify-start">
              <a
                onClick={() => setIsPlaying(false)}
                href={Number(page) > 1 ? `${Number(page) - 1}` : `#`}
              >
                <button type="button" aria-label="Previous">
                  <ChevronRightIcon className="h-9 w-9 cursor-pointer text-white mb-2" />
                </button>
              </a>
            </div>
            <div
              className="flex flex-grow cursor:pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <button
                type="button"
                className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -mt-2 mb-2 mx-auto w-16 h-16 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                aria-label="Pause"
              >
                {isPlaying ? (
                  <PauseIcon className="h-9 w-9 cursor-pointer text-slate" />
                ) : (
                  <PlayIcon className="h-9 w-9 cursor-pointer text-slate" />
                )}
              </button>
            </div>
            <div className="flex justify-end">
              <a
                onClick={() => setIsPlaying(false)}
                href={Number(page) < maxPages ? `${Number(page) + 1}` : `#`}
              >
                <button type="button" aria-label="Next">
                  <ChevronLeftIcon className="h-9 w-9 cursor-pointer text-white mb-2" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  let paramArray = [];
  for (let p = 1; p <= totalPages; p++) {
    paramArray.push({ params: { page: p.toString() } });
  }
  return {
    paths: paramArray,
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
