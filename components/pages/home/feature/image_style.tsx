"use client";
import { StaticImageData } from "next/image";
import Building from "../../../../public/images/img/building.avif";
import Gradient from "../../../../public/images/img/gradient.avif";
import Landscape from "../../../../public/images/img/landscape.avif";
import Random from "../../../../public/images/img/random.png";
import SciFi from "../../../../public/images/img/sci-fi.avif";
import ImageRadio from "@/components/global/image_radio";

interface ImageStyle {
  image: StaticImageData;
  name: string;
}

const ImageStyles: ImageStyle[] = [
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
  {
    image: Random,
    name: "Random",
  },
];

export default function MoodImageStyle() {
  return (
    <div className="mt-[25px]">
      <h1 className="font-medium text-[25px]">Let&apos;s set it right ...</h1>
      <div className="flex flex-wrap gap-7">
        {ImageStyles.map((style) => (
          <ImageRadio
            key={style.name}
            id={style.name.toLowerCase()}
            name="imageStyle"
            value={style.name}
            selected={false}
            imageUrl={style.image}
            label={style.name}
            size={200}
            showOverlay={false}
            imageFit={style.name == "Random" ? "none" : "cover"}
            textColor={style.name == "Random" ? "#6320EE" : "white"}
          />
        ))}
      </div>
    </div>
  );
}
