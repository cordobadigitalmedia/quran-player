import { BookOpenIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopBar({ stopPlay }) {
  const router = useRouter();
  const handleHome = () => {
    stopPlay();
    router.push("/");
  };
  return (
    <div className="flex justify-center justify-items-stretch p-1 text-white fixed top-0 left-0 right-0 bg-slate-50 drop-shadow">
      <div
        className="flex flex-row cursor-pointer"
        onClick={() => handleHome()}
      >
        <button type="button" aria-label="List">
          <BookOpenIcon className="h-[24px] w-[24px] text-[#007C84]" />
        </button>
      </div>
    </div>
  );
}
