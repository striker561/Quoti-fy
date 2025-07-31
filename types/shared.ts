import { QuotifyRequest } from "./requests";
import { QuoteImageResponse, QuoteResponse, QuotifyResponse } from "./responses";

export type QuoteReqData = {
    mood: string;
    moodRange: number;
    moodImageStyle: string;
    moodFilter: string;
};

export interface QuotePromptData {
    mood: string;
    moodScale: number;
    imageStyle: string;
    timeOfDay: string;
    location?: string;
    event?: string | null;
}


export type QuoteResponseProps = {
    generate: (form: QuoteReqData) => Promise<QuoteResponse>;
    isGenerating: boolean;
    error: string | null;
};

export type ImageResponseProps = {
    generate: (form: QuoteReqData) => Promise<QuoteImageResponse>;
    isGenerating: boolean;
    error: string | null;
};

export type QuotifyResponseProp = {
    quotify: (form: QuotifyRequest) => Promise<QuotifyResponse>;
    isLoading: boolean;
    error: string | null;
}

export type ModalInteractionProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};
