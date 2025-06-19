"use client";
import { useState } from "react";
import PillButton from "@/components/global/PillButton";

const DefaultFilters = ["Original", "Nostalgic", "Old", "Pop"];

export default function MoodFilterSelect() {
  const [moodFilter, setMoodFilter] = useState<string>("Original");
  return (
    <div className="mt-[25px]">
      <h2 className="font-medium text-[15px] lg:text-[20px]">Finally the filter !</h2>
      <div className="mt-3 flex overflow-auto scrollbar-hide gap-5 py-1">
        {DefaultFilters.map((mood) => (
          <PillButton
            key={mood}
            label={mood}
            variant="secondary"
            isSelected={mood == moodFilter}
            onClick={() => {
              setMoodFilter(mood);
            }}
          />
        ))}
      </div>
    </div>
  );
}
