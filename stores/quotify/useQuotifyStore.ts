import { create } from "zustand";
import { QuotifyState } from "./types";

const useQuotifyStore = create<QuotifyState>((set) => ({
    quoteResult: null,
    imageResult: null,
    quotifyResult: null,
    activeQuoteIndex: 0,
    quoteError: null,
    imageError: null,
    quotifyError: null,

    setQuoteResult: (data) => set({ quoteResult: data }),
    setImageResult: (data) => set({ imageResult: data }),
    setQuotifyResult: (data) => set({ quotifyResult: data }),
    setActiveQuoteIndex: (index) => set({ activeQuoteIndex: index }),
    setQuoteError: (err) => set({ quoteError: err }),
    setImageError: (err) => set({ imageError: err }),
    setQuotifyError: (err) => set({ quotifyError: err }),

    reset: () =>
        set({
            quoteResult: null,
            imageResult: null,
            quotifyResult: null,
            activeQuoteIndex: 0,
            quoteError: null,
            imageError: null,
            quotifyError: null,
        }),
}));

export default useQuotifyStore;