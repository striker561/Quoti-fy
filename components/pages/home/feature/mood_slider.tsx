"use client";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import Sad from "../../../../public/emoji/low.png";
import Mid from "../../../../public/emoji/mid.png";
import Happy from "../../../../public/emoji/high.png";
import EmojiCons from "@/components/global/emoji_cons";

interface MoodEmoji {
  image: StaticImageData;
  Alt: string;
}

const defaultMoodsEmoji: MoodEmoji[] = [
  {
    image: Sad,
    Alt: "Sad",
  },
  {
    image: Mid,
    Alt: "Neutral",
  },
  {
    image: Happy,
    Alt: "Happy",
  },
];

export default function MoodSlider() {
  const [sliderValue, setSliderValue] = useState(50);

  useEffect(() => {
    const slider = document.getElementById("progressRange") as HTMLInputElement;
    if (slider) {
      updateSliderBackground(slider);
    }
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSliderBackground(event.target);
    setSliderValue(Number(event.target.value));
  };

  function updateSliderBackground(slider: HTMLInputElement) {
    const val =
      ((parseInt(slider.value) - parseInt(slider.min)) /
        (parseInt(slider.max) - parseInt(slider.min))) *
      100;

    slider.style.background = `linear-gradient(to right, #5e00ff ${val}%, #cfd2d6 ${val}%)`;
  }

  return (
    <div className="mt-[25px]">
      <h1 className="font-medium text-[25px]">Adjust the vibe</h1>
      <div className="mt-3">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="custom-slider"
            id="progressRange"
          />
        </div>
        <div className="mt-1 flex justify-between">
          {defaultMoodsEmoji.map((emoji) => (
            <EmojiCons
              key={emoji.Alt}
              image={emoji.image}
              imageAlt={emoji.Alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
