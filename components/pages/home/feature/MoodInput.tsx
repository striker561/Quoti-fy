"use client";
import { useState } from "react";
import PillButton from "@/components/global/PillButton";
import { DefaultMoods } from "@/lib/constants";

type MoodInputProps = {
  onMoodChange: (mood: string) => void;
};


export default function MoodInput({ onMoodChange }: MoodInputProps) {
  const [moodText, setMoodText] = useState<string>("");

  const handlePillClick = (mood: string): void => {
    setMoodText(mood);
    onMoodChange(mood);
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const mood = e.target.value;
    setMoodText(mood);
    onMoodChange(mood);
  };

  return (
    <div className="p-3 bg-[#A6B1E1]/30 rounded-[20px] border-2 border-solid border-[#A6B1E1]">
      <input
        type="text"
        value={moodText}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        placeholder="One Word...."
        aria-label="Enter your current mood"
        className="outline-none w-full h-[5rem] text-[25px] lg:text-[30px] placeholder:text-[#6320EE] bg-transparent text-[#6320EE] font-semibold"
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
