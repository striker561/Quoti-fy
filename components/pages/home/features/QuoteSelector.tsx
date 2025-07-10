"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FeatureState,
  ModalInteractionProps,
  QuoteResult,
} from "@/types/shared";
import { useMoodGenerator } from "@/hooks/useMoodGenerator";
import { SkeletonCard } from "@/components/shared/preloaders/SkeletonCard";
import QuoteSlider from "@/components/shared/QuoteSlider";

export function QuoteSelectorModal({
  interaction,
  moodFormData,
}: {
  interaction: ModalInteractionProps;
  moodFormData: FeatureState;
}) {
  const { generateMood, isGenerating } = useMoodGenerator();
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<QuoteResult | null>(null);

  useEffect(() => {
    if (!interaction.open) return;

    setResult(null);

    generateMood(moodFormData)
      .then(setResult)
      .catch((err) => {
        console.error(err);
        setError(err.message ?? "An unknown error occurred");
      });
  }, [generateMood, interaction.open, moodFormData]);

  return (
    <Dialog open={interaction.open} onOpenChange={interaction.onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px]"
        showCloseButton={!isGenerating}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {isGenerating ? (
          <>
            <DialogTitle className="sr-only">Generating Image</DialogTitle>
            <SkeletonCard />
          </>
        ) : (
          <>
            {error ? (
              <DialogHeader>
                <DialogTitle>Unable to generate</DialogTitle>
                <DialogDescription className="text-red-500 p-3 text-center">
                  {error}
                </DialogDescription>
              </DialogHeader>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-center">“Quoti-fy”</DialogTitle>
                </DialogHeader>

                <div className="flex justify-center w-full px-4">
                  <div className="flex flex-col gap-5 w-full max-w-[500px]">
                    <div className="w-full aspect-[5/4] rounded-xl bg-gray-600"></div>

                    <div className="space-y-5">
                      <QuoteSlider
                        quotes={result?.generatedQuote as string[]}
                      />

                      <div className="h-10 w-full bg-gray-600 rounded-full" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
