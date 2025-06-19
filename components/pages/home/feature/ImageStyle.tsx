"use client";
import { useState } from "react";
import { StaticImageData } from "next/image";
import ImageRadio from "@/components/global/ImageRadio";
import Random from "../../../../public/images/img/random.png";
import SciFi from "../../../../public/images/img/sci-fi.avif";
import Building from "../../../../public/images/img/building.avif";
import Gradient from "../../../../public/images/img/gradient.avif";
import Landscape from "../../../../public/images/img/landscape.avif";

interface ImageStyle {
  image: StaticImageData;
  name: string;
}

const ImageStyles: ImageStyle[] = [
  {
    image: Random,
    name: "Random",
  },
  {
    image: Landscape,
    name: "Landscape",
  },
  {
    image: Building,
    name: "Buildings",
  },
  {
    image: SciFi,
    name: "Sci-Fi",
  },
  {
    image: Gradient,
    name: "Gradient",
  },
];

export default function MoodImageStyle() {
  const [imageStyle, setImageStyle] = useState<string>("Random");

  return (
    <div className="mt-[25px]">
      <h1 className="font-medium text-[25px]">Let&apos;s set it right ...</h1>
      <div className="flex flex-wrap gap-2 lg:gap-5 justify-center sm:justify-start">
        {ImageStyles.map((style) => (
          <ImageRadio
            key={style.name}
            id={style.name.toLowerCase().replace(/\s+/g, "-")}
            name="imageStyle"
            value={style.name}
            onSelect={() => setImageStyle(style.name)}
            selected={imageStyle == style.name}
            imageUrl={style.image}
            label={style.name}
            size={135}
            showOverlay={imageStyle == style.name}
            imageFit={style.name == "Random" ? "none" : "cover"}
            textColor={style.name == "Random" ? "#6320EE" : "white"}
          />
        ))}
      </div>
    </div>
  );
}
