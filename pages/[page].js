import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const quranImage = "https://quran-images-api.herokuapp.com/show/page/";

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
  return (
    <div>
      <Head>
        <title>Quran Recitation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {page && (
        <div className="flex bg-[#222C50] h-screen justify-center">
          <div className="max-w-xl bg-[#EDDABC] border-[#222C50] border-solid border-[20px]">
            <img src={`${quranImage}${page}`} alt="Quran page" />
          </div>
        </div>
      )}
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
