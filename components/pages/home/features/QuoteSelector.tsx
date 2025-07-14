"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FeatureState, ModalInteractionProps } from "@/types/shared";
import { useGenerateQuote, useGenerateImage } from "@/hooks/generators";
import { SkeletonCard } from "@/components/shared/preloaders/SkeletonCard";
import QuoteSlider from "@/components/shared/QuoteSlider";
import QuoteImage from "@/components/shared/QuoteImage";
import { QuoteImageResponse, QuoteResponse } from "@/types/responses";
import { Button } from "@/components/ui/button";


export function QuoteSelectorModal({
  interaction,
  moodFormData,
}: {
  interaction: ModalInteractionProps;
  moodFormData: FeatureState;
}) {
  const { generate: generateQuote, isGenerating: isGeneratingQuote } =
    useGenerateQuote();
  const { generate: generateImage, isGenerating: isGeneratingImage } =
    useGenerateImage();

  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null);
  const [imageResult, setImageResult] = useState<QuoteImageResponse | null>(
    null
  );
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Error | null>(null);

  const handleModalClose = () => {
    interaction.onOpenChange(false);
    setQuoteResult(null);
    setImageResult(null);
    setQuoteError(null);
    setImageError(null);
  };

  const handleGenerateQuote = useCallback(() => {
    setQuoteError(null);
    generateQuote(moodFormData)
      .then(setQuoteResult)
      .catch((err) => {
        console.error(err);
        setQuoteError(err.message ?? "An unknown error occurred");
      });
  }, [generateQuote, moodFormData]);

  const handleGenerateImage = () => {
    setImageError(null);
    generateImage(moodFormData)
      .then(setImageResult)
      .catch((err) => {
        console.error(err);
        setImageError(err);
      });
  };

  useEffect(() => {
    // TODO AUTO_GENERATE_ON_OPEN use context and add an option for user to decide of they want full control on how the quote is generated
    if (!interaction.open) return;
    handleGenerateQuote();
  }, [handleGenerateQuote, interaction.open]);

  const isGenerating = isGeneratingQuote;

  const renderQuoteSection = () => (
    <div className="space-y-5">
      <QuoteSlider
        quotes={quoteResult?.quotes ?? ["✨ Your quote appears here..."]}
      />

      <Button
        onClick={handleGenerateQuote}
        disabled={isGeneratingQuote}
        variant="ghost"
        className="
          px-4 py-2 text-sm font-medium rounded-full
          backdrop-blur-md bg-[#6320EE]/30 text-white
          border border-white/20 shadow-md
          transition hover:bg-[#A6B1E1]/40 active:scale-95
          w-full cursor-pointer"
      >
        {isGeneratingQuote ? "Generating..." : "🔁 Regenerate Quote"}
      </Button>

      <div className="h-10 w-full bg-gray-600 rounded-full" />
    </div>
  );

  return (
    <Dialog
      open={interaction.open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleModalClose();
      }}
    >
      <DialogContent
        className="sm:max-w-[600px]"
        showCloseButton={!isGenerating}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {quoteError ? (
          <DialogHeader>
            <DialogTitle>Unable to generate</DialogTitle>
            <DialogDescription className="text-red-500 p-3 text-center">
              {quoteError}
            </DialogDescription>
          </DialogHeader>
        ) : isGenerating ? (
          <>
            <DialogTitle className="sr-only">Generating Content</DialogTitle>
            <SkeletonCard />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                {quoteResult ? "“Quoti-fy”" : "Ready to generate?"}
              </DialogTitle>
              {!quoteResult && (
                <DialogDescription className="text-center text-muted-foreground">
                  Choose to generate a quote or an image.
                </DialogDescription>
              )}
            </DialogHeader>

            <div className="flex justify-center w-full px-4">
              <div className="flex flex-col gap-5 w-full max-w-[500px]">
                <QuoteImage
                  src={imageResult?.image as string}
                  onGenerate={handleGenerateImage}
                  isGenerating={isGeneratingImage}
                  error={imageError}
                />
                {renderQuoteSection()}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
