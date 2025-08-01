import { QuoteImageResponse, QuoteResponse, QuotifyResponse } from "@/types/responses";

export interface QuotifyState {
    quoteResult: QuoteResponse | null;
    imageResult: QuoteImageResponse | null;
    quotifyResult: QuotifyResponse | null;
    activeQuoteIndex: number;
    quoteError: Error | null;
    imageError: Error | null;
    quotifyError: Error | null;

    setQuoteResult: (data: QuoteResponse | null) => void;
    setImageResult: (data: QuoteImageResponse | null) => void;
    setQuotifyResult: (data: QuotifyResponse | null) => void;
    setActiveQuoteIndex: (index: number) => void;
    setQuoteError: (err: Error | null) => void;
    setImageError: (err: Error | null) => void;
    setQuotifyError: (err: Error | null) => void;
    reset: () => void;
}
