"use client";
import { QuoteImageResponse, QuoteResponse } from "@/types/responses";
import { Button } from "@/components/ui/button";
import QuoteSlider from "@/components/shared/QuoteSlider";
import { copyToClipBoard, shareUsingShareAPI } from "@/lib/generic";
import { useState } from "react";

interface QuoteRendererProps {
  quoteResult: QuoteResponse | null;
  imageResult: QuoteImageResponse | null;
  isGeneratingQuote: boolean;
  onGenerateQuote: () => void;
  onGenerateQuoteImageGen: () => void;
}

export default function QuoteRenderer({
  quoteResult,
  imageResult,
  isGeneratingQuote,
  onGenerateQuote,
  onGenerateQuoteImageGen,
}: QuoteRendererProps) {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const isWebShareAvailable =
    typeof navigator !== "undefined" && navigator.share;

  const currentQuote = quoteResult?.quotes?.[activeQuoteIndex] ?? "";

  return (
    <div className="space-y-5">
      <QuoteSlider
        quotes={quoteResult?.quotes ?? ["✨ Your quote appears here..."]}
        onQuoteChange={(_, index) => setActiveQuoteIndex(index)}
      />

      {quoteResult?.quota && (
        <p className="text-xs text-muted-foreground text-center">
          You&apos;ve used <b>{quoteResult.quota.current}</b> of{" "}
          <b>{quoteResult.quota.max}</b> quote generations today.
        </p>
      )}

      <Button
        onClick={onGenerateQuote}
        disabled={isGeneratingQuote}
        variant="ghost"
        className="
          px-4 py-2 text-sm font-medium rounded-full
          backdrop-blur-md bg-[#6320EE]/50 text-white
          border border-white/20 shadow-md
          transition hover:bg-[#A6B1E1]/40 active:scale-95
          w-full cursor-pointer"
      >
        {isGeneratingQuote
          ? "Generating..."
          : quoteResult?.quotes
          ? "🔁 Regenerate Quote"
          : "Generate Quote"}
      </Button>

      {quoteResult?.quotes && (
        <div className="space-y-2">
          {!imageResult?.image && (
            <div className="flex items-center gap-2 justify-between">
              <Button
                variant="outline"
                onClick={() => copyToClipBoard(currentQuote)}
                className="w-full text-xs"
              >
                📋 Copy Quote
              </Button>

              {isWebShareAvailable && (
                <Button
                  variant="ghost"
                  onClick={() =>
                    shareUsingShareAPI({
                      title: "Quoti-Fy",
                      text: currentQuote,
                      url: window.location.href,
                    })
                  }
                  className="w-full text-xs"
                >
                  📤 Share Quote
                </Button>
              )}
            </div>
          )}

          {imageResult?.image && (
            <Button
              onClick={onGenerateQuoteImageGen}
              variant="outline"
              className="relative overflow-hidden px-4 py-2 text-sm font-bold rounded-full 
                bg-gradient-to-r from-[#0C090D] via-[#22114C] to-[#6320EE] 
                text-white border-none shadow-[0_0_0_1px_rgba(255,255,255,0.1)] 
                backdrop-blur-md w-full h-10 transition-all duration-300 ease-in-out hover:brightness-110 active:scale-95 cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">✨ Quoti-fy</span>
              <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_2.5s_linear_infinite]" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
