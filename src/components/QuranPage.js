import React, { useState, useEffect } from "react";
import Image from "next/future/image";

const quranImage =
  "https://res.cloudinary.com/quran-adel/image/upload/v1662666252/quran/pages/";

export default function QuranPage({ page }) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  const css = { maxWidth: "100%", height: "auto" };
  return (
    <div className="-mt-[50px] -mb-[60px]">
      <Image
        style={css}
        src={`${quranImage}${currentPage}.jpg`}
        alt="Quran page"
        width={1000}
        height={1000}
        placeholder="blur"
        blurDataURL="/placeholder.png"
      />
    </div>
  );
}
