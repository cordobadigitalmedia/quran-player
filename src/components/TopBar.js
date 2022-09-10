import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar({ stopPlay }) {
  const router = useRouter();
  const handleHome = () => {
    stopPlay();
    router.push("/");
  };
  return (
    <div className="flex justify-center justify-items-stretch p-2 bg-[#222C50] text-white fixed top-0 left-0 right-0">
      <div
        className="flex flex-row cursor-pointer"
        onClick={() => handleHome()}
      >
        <button type="button" aria-label="List">
          <HomeIcon className="h-7 w-7 text-white mb-2 ml-2" />
        </button>
        <div className="pl-2 flex justify-center text-lg md:text-xl lg:text-2xl truncate">
          تلاوة القرآن بصوت عبدالله عادل
        </div>
      </div>
    </div>
  );
}
