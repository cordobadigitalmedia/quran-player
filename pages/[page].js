import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import QuranPage from "../src/components/QuranPage";
import Link from "next/link";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const Page = (quran) => {
  const router = useRouter();
  const { page } = router.query;
  console.log(quran);
  const pageData = quran.page;
  const [currentPage, setCurrentPage] = useState(0);
  const updatePage = (no) => {
    setCurrentPage(no);
  };
  const setSrcFromPage = (no) => {
    let src = "";
    if (no < 9) {
      src = `0${no + 1}.mp3`;
    } else {
      src = `${no + 1}.mp3`;
    }
    return src;
  };
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  return (
    <div>
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center justify-items-stretch p-2 bg-[#222C50] text-white fixed top-0 left-0 right-0">
        <div className="pl-2 flex flex-grow justify-center text-lg md:text-xl lg:text-2xl truncate">
          تلاوة القرآن بصوت عبدالله عادل
        </div>
      </div>
      <div className="h-screen sm:h-full flex items-center justify-center">
        <div className="max-w-2xl mx-auto py-10">
          {page && <QuranPage page={page} />}
        </div>
      </div>
      <div className="flex justify-center py-2 text-gray-100 fixed bottom-0 left-0 right-0 bg-[#222C50] text-l">
        <div className="flex items-center justify-evenly">
          <Link href={`/${Number(page) + 1}`}>
            <button type="button" className="ml-2" aria-label="Right">
              <ArrowRightCircleIcon className="h-7 w-7 cursor-pointer text-white" />
            </button>
          </Link>
          <Link href={`/${Number(page) - 1}`}>
            <button type="button" className="mr-2" aria-label="Left">
              <ArrowLeftCircleIcon className="h-7 w-7 cursor-pointer text-white" />
            </button>
          </Link>
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
