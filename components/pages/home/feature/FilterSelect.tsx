"use client";
import { useState } from "react";
import { DefaultFilters } from "@/lib/constants";
import PillButton from "@/components/global/PillButton";

type MoodFilerSelectProp = {
  onFilterChange: (filter: string) => void;
};

export default function MoodFilterSelect({
  onFilterChange,
}: MoodFilerSelectProp) {
  const [moodFilter, setMoodFilter] = useState<string>("");

  return (
    <div className="mt-[25px]">
      <h2 className="font-medium text-[15px] lg:text-[20px]">
        Finally the filter !
      </h2>
      <div className="mt-3 flex overflow-auto scrollbar-hide gap-5 py-1">
        {DefaultFilters.map((mood) => (
          <PillButton
            key={mood}
            label={mood}
            variant="secondary"
            isSelected={mood == moodFilter}
            onClick={() => {
              setMoodFilter(mood);
              onFilterChange(mood);
            }}
          />
        ))}
      </div>
    </div>
  );
}
