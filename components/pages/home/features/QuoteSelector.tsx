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
import {
  UseGenerateQuote,
  UseGenerateImage,
  UseQuotify,
} from "@/hooks/generators";
import { SkeletonCard } from "@/components/shared/preloaders/SkeletonCard";
import QuoteImage from "@/components/shared/QuoteImage";
import {
  QuoteImageResponse,
  QuoteResponse,
  QuotifyResponse,
} from "@/types/responses";
import QuoteRenderer from "./QuoteRender";
import { QuotifyRequest } from "@/types/requests";
import QuotifyPreview from "./QuotifyPreview";

export function QuoteSelectorModal({
  interaction,
  moodFormData,
}: {
  interaction: ModalInteractionProps;
  moodFormData: FeatureState;
}) {
  // --- Hooks ---
  const { generate: generateQuote, isGenerating: isGeneratingQuote } =
    UseGenerateQuote();
  const { generate: generateImage, isGenerating: isGeneratingImage } =
    UseGenerateImage();
  const { quotify, isLoading: isQuotifying } = UseQuotify();

  // --- States ---
  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null);
  const [imageResult, setImageResult] = useState<QuoteImageResponse | null>(
    null
  );
  const [quotifyResult, setQuotifyResult] = useState<QuotifyResponse | null>(
    null
  );
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  // --- Errors ---
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Error | null>(null);
  const [quotifyError, setQuotifyError] = useState<string | null>(null);

  // --- Handlers ---
  const handleModalClose = () => {
    interaction.onOpenChange(false);
    setQuoteResult(null);
    setImageResult(null);
    setQuotifyResult(null);
    setQuoteError(null);
    setImageError(null);
    setQuotifyError(null);
    setActiveQuoteIndex(0);
  };

  const handleGenerateQuote = useCallback(() => {
    setQuoteError(null);
    generateQuote(moodFormData)
      .then(setQuoteResult)
      .catch((err) => {
        console.error(err);
        setQuoteError(
          err?.message ?? "An error occurred while generating the quote."
        );
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

  const handleGenerateQuoteImageGen = () => {
    if (!imageResult?.image || !quoteResult?.quotes?.[activeQuoteIndex]) return;

    const data: QuotifyRequest = {
      image: imageResult.image,
      quote: quoteResult.quotes[activeQuoteIndex],
      filter: moodFormData.moodFilter,
    };

    quotify(data)
      .then(setQuotifyResult)
      .catch((err) => {
        console.error(err);
        setQuotifyError(err?.message ?? "Failed to merge quote and image.");
      });
  };

  useEffect(() => {
    // TODO AUTO_GENERATE_ON_OPEN use context and add an option for user to decide of they want full control on how the quote is generated
    if (!interaction.open) return;
    handleGenerateQuote();
  }, [handleGenerateQuote, interaction.open]);

  const isBusy = isGeneratingQuote || isQuotifying;

  return (
    <Dialog
      open={interaction.open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleModalClose();
      }}
    >
      <DialogContent
        className="sm:max-w-[600px]"
        showCloseButton={!isBusy}
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* --- Error State --- */}
        {quoteError ? (
          <DialogHeader>
            <DialogTitle>Error Generating Quote</DialogTitle>
            <DialogDescription className="text-red-500 p-3 text-center">
              {quoteError}
            </DialogDescription>
          </DialogHeader>
        ) : isBusy ? (
          <>
            <DialogTitle className="sr-only">Generating Content</DialogTitle>
            <SkeletonCard />
          </>
        ) : quotifyResult ? (
          <QuotifyPreview
            image={quotifyResult.image as string}
            onReset={() => setQuotifyResult(null)}
            metadata={{
              generatedImage: quotifyResult.image,
              promptData: moodFormData,
              quotifyReq: {
                image: imageResult?.image as string,
                quote: quoteResult?.quotes?.[activeQuoteIndex] as string,
                filter: moodFormData.moodFilter,
              },
            }}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                {quoteResult ? "Quote Preview" : "Ready to generate?"}
              </DialogTitle>
              {!quoteResult && (
                <DialogDescription className="text-center text-muted-foreground">
                  You can generate a quote and image based on your mood.
                </DialogDescription>
              )}
            </DialogHeader>

            {/* --- Main Content --- */}
            <div className="flex justify-center w-full px-4">
              <div className="flex flex-col gap-2 w-full max-w-[500px]">
                <QuoteImage
                  src={imageResult?.image as string}
                  onGenerate={handleGenerateImage}
                  isGenerating={isGeneratingImage}
                  error={imageError}
                />
                {imageResult?.quota && (
                  <p className="text-xs text-muted-foreground text-center">
                    You&apos;ve used <b>{imageResult.quota.current}</b> of{" "}
                    <b>{imageResult.quota.max}</b> image generations today.
                  </p>
                )}
                <QuoteRenderer
                  quoteResult={quoteResult}
                  imageResult={imageResult}
                  isGeneratingQuote={isGeneratingQuote}
                  isGeneratingImage={isGeneratingImage}
                  onGenerateQuote={handleGenerateQuote}
                  onGenerateQuoteImageGen={handleGenerateQuoteImageGen}
                  activeQuoteIndex={activeQuoteIndex}
                  setActiveQuoteIndex={setActiveQuoteIndex}
                />
                {quotifyError && (
                  <p className="text-xs text-center text-red-500">
                    {quotifyError}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
