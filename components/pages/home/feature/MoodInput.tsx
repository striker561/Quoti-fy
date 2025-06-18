"use client";
import { useState } from "react";
import PillButton from "@/components/global/PillButton";

const DefaultMoods = [
  "Focused",
  "Determined",
  "Loved",
  "Cheerful",
  "Funny",
  "Motivated",
  "Energetic",
  "Happy",
  "Romantic",
];

export default function MoodInput() {
  const [moodText, setMoodText] = useState<string>("");

  const handlePillClick = (mood: string): void => {
    setMoodText(mood);
  };

  const handleOnBlur = (): void => {
    const firstWord = moodText.trim().split(" ")[0] || "";
    const formatted =
      firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
    setMoodText(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOnBlur();
    }
  };

  return (
    <div className="p-3 bg-[#A6B1E1] rounded-[20px] border-2 border-solid border-indigo-700">
      <input
        type="text"
        value={moodText}
        onChange={(e) => {
          setMoodText(e.target.value);
        }}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        placeholder="One Word...."
        aria-label="Enter your current mood"
        className="outline-none w-full h-[86px] text-[35px] placeholder:text-[#CACFD6] bg-transparent"
      />
      <hr className="w-full h-[5px]" />
      <div className="mt-3 flex overflow-auto scrollbar-hide gap-2 py-1">
        {DefaultMoods.map((mood) => (
          <PillButton
            key={mood}
            label={mood}
            onClick={() => {
              handlePillClick(mood);
            }}
            isSelected={moodText.toLowerCase() === mood.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
}
