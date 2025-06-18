import Image from "next/image";
import { AppWindow } from "lucide-react";
import ProfileIcon from "../../../public/images/icons/Profile.png";
import { ModeToggle } from "@/components/theme/ThemeToggle";

export default function HomeNavBar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>
        <div className="drop-shadow-xl cursor-pointer">
          <AppWindow className="" />
        </div>
      </div>
      <div className="flex justify-around w-[7rem]">
        <ModeToggle />
        <div className="h-[2rem] w-[2rem] rounded-full border-2 border-solid border-[#6320EE] flex justify-center p-2 drop-shadow-lg">
          <Image
            src={ProfileIcon}
            alt="Profile Icon"
            className="rounded-full"
          />
        </div>
      </div>
    </nav>
  );
}
