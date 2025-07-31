"use client";
import { useState } from "react";
import WelcomeText from "./WelcomeText";
import MoodInput from "./forms/MoodInput";
import MoodSlider from "./forms/MoodSlider";
import MoodImageStyle from "./forms/ImageStyle";
import MoodFilterSelect from "./forms/FilterSelect";
import GenerateButton from "./forms/GenerateBtn";
import { DEFAULT_MOOD_RANGE } from "@/data/constants";
import { FeatureState } from "@/types/shared";
import { QuoteSelectorModal } from "./QuoteSelector";

export default function FeatureFrame() {
  const [formState, setFormState] = useState<FeatureState>({
    mood: "",
    moodRange: DEFAULT_MOOD_RANGE,
    moodImageStyle: "",
    moodFilter: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const isComplete =
    formState.mood.trim() !== "" &&
    formState.moodRange > 0 &&
    formState.moodImageStyle.trim() !== "" &&
    formState.moodFilter.trim() !== "";

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
        <GenerateButton
          isActive={isComplete}
          onClick={() => {
            setModalOpen(true);
          }}
        />
        {modalOpen && (
          <QuoteSelectorModal
            interaction={{
              open: modalOpen,
              onOpenChange: setModalOpen,
            }}
            moodFormData={formState}
          />
        )}
      </div>
    </div>
  );
}
