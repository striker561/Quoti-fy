import React from "react";
import Image, { StaticImageData } from "next/image";

interface EmojiConsProps {
  height?: number;
  width?: number;
  image: StaticImageData;
  imageAlt: string;
  onClick?: () => void;
}

const EmojiCons: React.FC<EmojiConsProps> = ({
  image,
  imageAlt,
  height = 25,
  width = 25,
}) => {
  return (
    <div
      className={`h-[${height}] w-[${width}] rounded-full bg-[#d9d9d9f5]/30 drop-shadow-lg`}
    >
      <Image
        src={image}
        alt={imageAlt}
        width={width - 5}
        height={height - 5}
        quality={100}
        priority={true}
        className="rounded-full"
      />
    </div>
  );
};

export default EmojiCons;
