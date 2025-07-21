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
  useGenerateQuote,
  useGenerateImage,
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
  // hooks
  const { generate: generateQuote, isGenerating: isGeneratingQuote } =
    useGenerateQuote();
  const { generate: generateImage, isGenerating: isGeneratingImage } =
    useGenerateImage();
  const { quotify, isLoading: isQuotifying } = UseQuotify();

  // results
  const [quoteResult, setQuoteResult] = useState<QuoteResponse | null>(null);
  const [imageResult, setImageResult] = useState<QuoteImageResponse | null>(
    null
  );
  const [quotifyResult, setQuotifyResult] = useState<QuotifyResponse | null>(
    null
  );

  // errors
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Error | null>(null);
  const [quotifyError, setQuotifyError] = useState<string | null>(null);

  const handleModalClose = () => {
    interaction.onOpenChange(false);
    setQuoteResult(null);
    setImageResult(null);
    setQuoteError(null);
    setImageError(null);
    setQuotifyError(null);
    setQuotifyResult(null);
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

  const handleGenerateQuoteImageGen = () => {
    const quoteData: QuotifyRequest = {
      image: imageResult?.image as string,
      quote: quoteResult?.quotes?.[0] as string,
      filter: moodFormData.moodFilter,
    };
    quotify(quoteData)
      .then(setQuotifyResult)
      .catch((err) => {
        console.error(err);
        setQuotifyError(err.message ?? "Something went wrong");
      });
  };

  useEffect(() => {
    // TODO AUTO_GENERATE_ON_OPEN use context and add an option for user to decide of they want full control on how the quote is generated
    if (!interaction.open) return;
    handleGenerateQuote();
  }, [handleGenerateQuote, interaction.open]);

  const isGenerating = isGeneratingQuote || isQuotifying;

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
        ) : quotifyResult ? (
          <QuotifyPreview
            image={quotifyResult.image as string}
            onReset={() => setQuotifyResult(null)}
          />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                {quoteResult ? "Quote Preview" : "Ready to generate?"}
              </DialogTitle>
              {!quoteResult && (
                <DialogDescription className="text-center text-muted-foreground">
                  Choose to generate a quote or an image.
                </DialogDescription>
              )}
            </DialogHeader>

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
                  onGenerateQuote={handleGenerateQuote}
                  onGenerateQuoteImageGen={handleGenerateQuoteImageGen}
                />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
