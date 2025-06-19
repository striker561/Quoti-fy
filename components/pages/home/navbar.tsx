import Image from "next/image";
import { AppWindow } from "lucide-react";
import { ModeToggle } from "@/components/theme/ThemeToggle";
import ProfileIcon from "../../../public/images/icons/Profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function HomeNavBar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4 w-[7rem]">
        <Button
          className="drop-shadow-xl cursor-pointer flex items-center"
          size="icon"
        >
          <AppWindow className="" />
        </Button>
        <span className="flex items-center">
          <ModeToggle />
        </span>
      </div>

      <div className="flex items-center gap-2 w-[8rem]">
        <div className="h-[2.25rem] w-[2.25rem] rounded-full border-2 border-solid border-[#6320EE] flex item-center p-2 cursor-pointer drop-shadow-xl">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={ProfileIcon}
                alt="Profile Icon"
                className="rounded-full flex items-center"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className="cursor-pointer flex items-center" variant="outline">
          Sign In
        </Button>
      </div>
    </nav>
  );
}
