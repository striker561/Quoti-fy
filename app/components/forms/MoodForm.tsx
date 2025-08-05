"use client";
import { useState } from "react";
import WelcomeText from "../WelcomeText";
import MoodInput from "./MoodInput";
import MoodSlider from "./MoodSlider";
import MoodImageStyle from "./ImageStyle";
import MoodFilterSelect from "./FilterSelect";
import GenerateButton from "./GenerateBtn";
import { DEFAULT_MOOD_RANGE } from "@/data/constants";
import { QuoteReqData } from "@/types/shared";
import { QuotifyModal } from "../quotes/QuotifyModal";

export default function MoodForm() {
  const [formState, setFormState] = useState<QuoteReqData>({
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
    <div className="my-20">
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
          <QuotifyModal
            interaction={{
              open: modalOpen,
              onOpenChange: setModalOpen,
            }}
            quoteFormData={formState}
          />
        )}
      </div>
    </div>
  );
}
