"use client";
import { useState } from "react";
import WelcomeText from "./feature/WelcomeText";
import MoodInput from "./feature/MoodInput";
import MoodSlider from "./feature/MoodSlider";
import MoodImageStyle from "./feature/ImageStyle";
import MoodFilterSelect from "./feature/FilterSelect";
import GenerateButton from "./feature/GenerateBtn";
import { DEFAULT_MOOD_RANGE } from "@/lib/constants";
import { FeatureState } from "@/types/shared";
import { useMoodGenerator } from "@/hooks/useMoodGenerator";

export default function FeatureFrame() {
  const { generateMood, isGenerating, error } = useMoodGenerator();
  const [formState, setFormState] = useState<FeatureState>({
    mood: "",
    moodRange: DEFAULT_MOOD_RANGE,
    moodImageStyle: "",
    moodFilter: "",
  });

  const isComplete =
    formState.mood.trim() !== "" &&
    formState.moodRange > 0 &&
    formState.moodImageStyle.trim() !== "" &&
    formState.moodFilter.trim() !== "";

  const handleOnSubmit = async () => {
    try {
      const result = await generateMood(formState);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(isGenerating)
  console.log(error)

  return (
    <div className="my-20 @container">
      <div className="mx-4 md:mx-[15rem] lg:mx-[15rem]">
        <WelcomeText />
        <MoodInput
          onMoodChange={(mood) => setFormState((s) => ({ ...s, mood }))}
        />
        <MoodSlider
          onSliderChange={(moodRange) =>
            setFormState((s) => ({ ...s, moodRange }))
          }
        />
        <MoodImageStyle
          onImageStyleChange={(moodImageStyle) =>
            setFormState((s) => ({ ...s, moodImageStyle }))
          }
        />
        <MoodFilterSelect
          onFilterChange={(moodFilter) =>
            setFormState((s) => ({ ...s, moodFilter }))
          }
        />
        <GenerateButton isActive={isComplete} onClick={handleOnSubmit} />
      </div>
    </div>
  );
}
