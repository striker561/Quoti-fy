"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { startSignIn } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export function AuthModal() {
  const [isLoading, setIsLoading] = useState<{
    google: boolean;
    github: boolean;
  }>({
    google: false,
    github: false,
  });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (provider: "google" | "github") => {
    setError(null);
    setIsLoading((prev: { google: boolean; github: boolean }) => ({
      ...prev,
      [provider]: true,
    }));

    try {
      const authUrl = await startSignIn(provider);
      window.location.assign(authUrl);
    } catch (err: unknown) {
      console.error("Login error:", err);
      setError("Something went wrong trying to sign ");
    } finally {
      setIsLoading((prev: { google: boolean; github: boolean }) => ({
        ...prev,
        [provider]: false,
      }));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login To Save Session</DialogTitle>
          <DialogDescription>
            Please sign in to securely save your data, images, and generated
            quotes, and to manage your usage limits.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              className="w-full cursor-pointer flex items-center justify-center"
              onClick={() => handleLogin("github")}
              disabled={isLoading.github}
            >
              {isLoading.github ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login with Github"
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer flex items-center justify-center"
              onClick={() => handleLogin("google")}
              disabled={isLoading.google}
            >
              {isLoading.google ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login with Google"
              )}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
