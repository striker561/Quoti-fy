import Image from "next/image";
import { useState } from "react";

export default function QuoteImage({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[5/4] overflow-hidden rounded-xl bg-gray-300">
      <Image
        src={src}
        alt="Generated Quote Image"
        fill
        className={`object-cover transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
        priority
      />
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-400/50" />
      )}
    </div>
  );
}
