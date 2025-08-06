"use client";
import {
    UseGenerateImage,
    UseGenerateQuote,
    UseQuotify,
} from "@/app/components/hooks/generators";
import { QuotifySkeleton } from "@/app/components/preloaders/QuotifySkeleton";
import QuoteImage from "@/components/shared/QuoteImage";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useQuotifyStore from "@/stores/quotify/useQuotifyStore";
import { QuotifyRequest } from "@/types/requests";
import { ModalInteractionProps, QuoteReqData } from "@/types/shared";
import { useCallback, useEffect } from "react";
import QuotePreview from "./QuotePreview";
import QuoteRenderer from "./QuoteRender";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export function QuotifyModal({
    interaction,
    quoteFormData,
}: {
    interaction: ModalInteractionProps;
    quoteFormData: QuoteReqData;
}) {
    // --- Hooks ---
    const { generate: generateQuote, isGenerating: isGeneratingQuote } = UseGenerateQuote();
    const { generate: generateImage, isGenerating: isGeneratingImage } = UseGenerateImage();
    const { quotify, isLoading: isQuotifying } = UseQuotify();

    const {
        quoteResult,
        imageResult,
        quotifyResult,
        activeQuoteIndex,
        quoteError,
        imageError,
        quotifyError,
        setQuoteResult,
        setImageResult,
        setQuotifyResult,
        setActiveQuoteIndex,
        setQuoteError,
        setImageError,
        setQuotifyError,
        reset,
    } = useQuotifyStore();

    // --- Handlers ---
    const handleModalClose = () => {
        interaction.onOpenChange(false);
        reset();
    };

    const handleGenerateQuote = useCallback(() => {
        setQuoteError(null);
        generateQuote(quoteFormData)
            .then(setQuoteResult)
            .catch((err) => {
                console.error(err);
                setQuoteError(err);
            });
    }, [generateQuote, quoteFormData, setQuoteError, setQuoteResult]);

    const handleGenerateImage = () => {
        setImageError(null);
        generateImage(quoteFormData)
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
            filter: quoteFormData.moodFilter,
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
                    <>
                        <DialogHeader>
                            <DialogTitle>Error Generating Quote</DialogTitle>
                        </DialogHeader>
                        <Alert variant="destructive" className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>
                                {quoteError.message || "Something went wrong"}
                            </AlertTitle>
                        </Alert>
                    </>
                ) : isBusy ? (
                    <>
                        {/* --- Loading State --- */}
                        <DialogTitle className="sr-only">Generating Content</DialogTitle>
                        <QuotifySkeleton />
                    </>
                ) : quotifyResult ? (
                    <>
                        {/* --- Quote + Image Preview State --- */}
                        <QuotePreview
                            image={quotifyResult.image as string}
                            onReset={() => setQuotifyResult(null)}
                            metadata={{
                                generatedImage: quotifyResult.image,
                                promptData: quoteFormData,
                                quotifyReq: {
                                    image: imageResult?.image as string,
                                    quote: quoteResult?.quotes?.[activeQuoteIndex] as string,
                                    filter: quoteFormData.moodFilter,
                                },
                            }}
                        />
                    </>
                ) : (
                    <>
                        {/* --- Default State --- */}
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
                                    isGeneratingQuote={isGeneratingQuote}
                                    isGeneratingImage={isGeneratingImage}
                                    onGenerateQuote={handleGenerateQuote}
                                    onGenerateQuoteImageGen={handleGenerateQuoteImageGen}
                                    setActiveQuoteIndex={setActiveQuoteIndex}
                                />
                                {quotifyError && (
                                    <p className="text-xs text-center text-red-500">
                                        {quotifyError.message}
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
