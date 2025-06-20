"use client";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import EmojiCons from "@/components/global/EmojiCons";
import Sad from "../../../../public/images/emoji/low.png";
import Mid from "../../../../public/images/emoji/mid.png";
import Happy from "../../../../public/images/emoji/high.png";

interface MoodEmoji {
  image: StaticImageData;
  Alt: string;
}

type MoodSliderProps = {
  onSliderChange: (moodRange: number) => void;
};

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

export default function MoodSlider({ onSliderChange }: MoodSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    const slider = document.getElementById("progressRange") as HTMLInputElement;
    if (slider) {
      let current = 0;
      const animateTo50 = () => {
        if (!isMounted) return;
        if (current < 50) {
          current += 1;
          setSliderValue(current);
          updateSliderBackground(slider);
          setTimeout(animateTo50, 5);
        }
      };
      animateTo50();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSliderBackground(event.target);
    setSliderValue(Number(event.target.value));
    onSliderChange(Number(event.target.value));
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
      <h2 className="font-medium text-[15px] lg:text-[20px]">
        Adjust the vibe
      </h2>
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
