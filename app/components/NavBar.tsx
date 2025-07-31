"use client";
import Image from "next/image";
import { AppWindow, Loader2, UserRound } from "lucide-react";
import { ModeToggle } from "@/components/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/shared/modals/AuthModal";
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
                {currentUser ? (
                  currentUser.image ? (
                    <div className="max-w-[44px] overflow-hidden">
                      <Image
                        src={currentUser.image}
                        alt={
                          currentUser.name
                            ? `${currentUser.name}'s profile picture`
                            : "Default profile icon"
                        }
                        className="p-1 rounded-full border-2 border-solid border-[#6320EE] flex items-center justify-center cursor-pointer drop-shadow-xl w-9 h-9 object-cover"
                        width={36}
                        height={36}
                      />
                    </div>
                  ) : (
                    <div className="border-2 rounded-full p-1 border-[#6320EE]">
                      <UserRound />
                    </div>
                  )
                ) : (
                  <div className="border-2 rounded-full p-1 border-[#A6B1E1]">
                    <UserRound />
                  </div>
                )}
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
