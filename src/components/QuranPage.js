import React, { useState, useEffect } from "react";

const quranImage =
  "https://res.cloudinary.com/duisewapt/image/upload/v1662666252/quran/pages/";

export default function QuranPage({ page }) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div className="-mt-[50px] -mb-[60px]">
      <img
        className="mx-auto"
        src={`${quranImage}${currentPage}.jpg`}
        alt="Quran page"
      />
    </div>
  );
}
