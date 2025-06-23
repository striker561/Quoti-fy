"use client";
import Image from "next/image";
import { AppWindow, Loader2 } from "lucide-react";
import { ModeToggle } from "@/components/theme/ThemeToggle";
import ProfileIcon from "../../../public/images/icons/Profile.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/global/modals/AuthModal";
import { signOut, useSession } from "next-auth/react";

export default function HomeNavBar() {
  const { data: session, status } = useSession();
  const currentUser = session?.user;
  const isLoading = status == "loading";

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4 w-[7rem]">
        <Button
          className="drop-shadow-xl cursor-pointer flex items-center"
          size="icon"
        >
          <AppWindow />
        </Button>
        <span className="flex items-center">
          <ModeToggle />
        </span>
      </div>

      <div className="flex items-center gap-2">
        {!isLoading ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild disabled={!currentUser}>
                <Image
                  src={currentUser?.image ? currentUser.image : ProfileIcon}
                  alt={
                    currentUser
                      ? `${currentUser.name}'s profile picture`
                      : "Default profile icon"
                  }
                  className="p-1 rounded-full border-2 border-solid border-[#6320EE] flex items-center justify-center cursor-pointer drop-shadow-xl"
                  width={36}
                  height={36}
                />
              </DropdownMenuTrigger>
              {currentUser && (
                <DropdownMenuContent align="center">
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
            {!currentUser && <AuthModal />}
          </>
        ) : (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      </div>
    </nav>
  );
}
