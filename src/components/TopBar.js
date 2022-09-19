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
    <div className="flex justify-center justify-items-stretch p-2 text-white fixed top-0 left-0 right-0">
      <div
        className="flex flex-row cursor-pointer"
        onClick={() => handleHome()}
      >
        <button type="button" aria-label="List">
          <BookOpenIcon className="h-7 w-7 text-[#007C84] mb-2 ml-2" />
        </button>
      </div>
    </div>
  );
}
