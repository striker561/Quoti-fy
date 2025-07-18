"use client";
import { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import { DEFAULT_MOOD_RANGE } from "@/data/constants";
import EmojiCons from "@/components/shared/EmojiCons";
import { HappyEmoji, MidEmoji, SadEmoji } from "@/data/images";

interface MoodEmoji {
  image: StaticImageData;
  alt: string;
}

type MoodSliderProps = {
  onSliderChange: (moodRange: number) => void;
};

const defaultMoodsEmoji: MoodEmoji[] = [
  {
    image: SadEmoji,
    alt: "Sad",
  },
  {
    image: MidEmoji,
    alt: "Neutral",
  },
  {
    image: HappyEmoji,
    alt: "Happy",
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
        if (current < DEFAULT_MOOD_RANGE) {
          current += 1;
          setSliderValue(current);
          updateSliderBackground(slider);
          requestAnimationFrame(animateTo50);
        }
      };

      if (DEFAULT_MOOD_RANGE > 100 || DEFAULT_MOOD_RANGE < 0) return;
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

    slider.style.background = `linear-gradient(to right, #6320EE ${val}%, #A6B1E1 ${val}%)`;
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
            step="1"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            className="custom-slider"
            id="progressRange"
            aria-label="Mood level slider"
          />
        </div>
        <div className="mt-1 flex justify-between">
          {defaultMoodsEmoji.map((emoji) => (
            <EmojiCons
              key={emoji.alt}
              image={emoji.image}
              imageAlt={emoji.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
