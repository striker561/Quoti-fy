"use client";
import Image from "next/image";
import { UserRound } from "lucide-react";
import { ModeToggle } from "@/components/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthModal } from "@/components/shared/modals/AuthModal";
import { signOut } from "next-auth/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuthStore from "@/stores/auth/useAuthStore";

export default function HomeNavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    logout();
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4 w-[7rem]">
        <SidebarTrigger />
        <span className="flex items-center">
          <ModeToggle />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={!isAuthenticated}>
            {isAuthenticated && user ? (
              user.image ? (
                <div className="max-w-[44px] overflow-hidden">
                  <Image
                    src={user.image}
                    alt={
                      user.name
                        ? `${user.name}'s profile picture`
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
          {user && (
            <DropdownMenuContent align="center">
              <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        {!user && <AuthModal />}
      </div>
    </nav>
  );
}
