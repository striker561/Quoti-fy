import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuoteImage({
  src,
  onGenerate,
  isGenerating,
  error,
}: {
  src?: string;
  onGenerate: () => void;
  isGenerating: boolean;
  error: Error | null;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const showPlaceholder = !src || !isLoaded;

  return (
    <div className="relative w-full aspect-[5/4] overflow-hidden rounded-xl bg-gray-300">
      {src && (
        <>
          <Image
            src={src}
            alt="Generated Quote Image"
            fill
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            variant="ghost"
            className="
                z-10 absolute bottom-2 left-1/2 -translate-x-1/2
                px-4 py-2 text-sm font-medium rounded-full
                backdrop-blur-md bg-[#6320EE]/30 text-white
                border border-white/20 shadow-md
                transition hover:bg-[#A6B1E1]/40 active:scale-95
                w-[85%] max-w-xs cursor-pointer"
          >
            {isGenerating ? "Regenerating..." : "🔁 Regenerate Visual"}
          </Button>
        </>
      )}

      {showPlaceholder && !error && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-400/50 cursor-pointer">
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            variant="secondary"
            className="z-10"
          >
            {isGenerating ? "Generating..." : "✨ Generate Visual"}
          </Button>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#A6B1E1]/70 text-[#6320EE] text-center px-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {error.message.includes("limit")
                ? "You've hit your image generation limit for today."
                : error.message}
            </p>
            {!error.message.includes("limit") && (
              <Button
                onClick={onGenerate}
                disabled={isGenerating}
                variant="ghost"
                className="mt-2 bg-[#6320EE]/30 cursor-pointer"
              >
                🔄 Try Again
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
