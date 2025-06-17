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
  height = 30,
  width = 30,
}) => {
  return (
    <div
      className={`h-[${height}] w-[${width}] rounded-full bg-[#D9D9D9] drop-shadow-lg`}
    >
      <Image
        src={image}
        alt={imageAlt}
        width={width - 10}
        height={height - 10}
        className="rounded-full"
      />
    </div>
  );
};

export default EmojiCons;
