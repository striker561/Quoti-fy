"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FeatureState,
  ModalInteractionProps,
  QuoteResult,
} from "@/types/shared";
import { useMoodGenerator } from "@/hooks/useMoodGenerator";
import { SkeletonCard } from "@/components/global/preloaders/SkeletonCard";

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
                  <DialogTitle>Here is your quote</DialogTitle>
                  <DialogDescription>Here is your quotes</DialogDescription>
                </DialogHeader>

                <div className="mt-5">
                  <div className="flex flex-col gap-3"></div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
