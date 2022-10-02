import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import QuranPage from "../../src/components/QuranPage";
import { useSwipeable, UP, DOWN, SwipeEventData } from "react-swipeable";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import TopBar from "../../src/components/TopBar";
import AudioPlayer from "../../src/components/AudioPlayer";

//Add transition for swipe
//Add timer and end of audio stop

const maxPages = 3;
const totalPages = 604;

const Page = ({ quran, chapters }) => {
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

  const pageData = quran;
  console.log(quran);
  console.log(chapters);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  const updatePlayStatus = (status) => {
    setIsPlaying(status);
  };
  const cancelPlay = () => {
    setIsPlaying(false);
  };
  return (
    <div className="h-full w-full flex justify-center">
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar stopPlay={cancelPlay} />
      <div className="max-w-[480px]">
        {page && (
          <QuranPage
            page={quran}
            chapters={chapters.chapters}
            pageNo={currentPage}
          />
        )}
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
      `https://api.quran.com/api/v4/verses/by_page/${params.page}?words=true&word_fields=text_uthmani,line_number&fields=chapter_id`
    );
    const data = await res.json();
    const resChapters = await fetch(`https://api.quran.com/api/v4/chapters/`);
    const dataChapters = await resChapters.json();
    return {
      props: { quran: data, chapters: dataChapters },
    };
  }
}

export default Page;
