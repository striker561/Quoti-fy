import { QuotifyRequest } from "./requests";
import { QuoteImageResponse, QuoteResponse, QuotifyResponse } from "./responses";

export type FeatureState = {
    mood: string;
    moodRange: number;
    moodImageStyle: string;
    moodFilter: string;
};

export interface MoodPromptInput {
    mood: string;
    moodScale: number;
    imageStyle: string;
    timeOfDay: string;
    location?: string;
    event?: string | null;
}


export type QuoteResponseProps = {
    generate: (form: FeatureState) => Promise<QuoteResponse>;
    isGenerating: boolean;
    error: string | null;
};

export type ImageResponseProps = {
    generate: (form: FeatureState) => Promise<QuoteImageResponse>;
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
