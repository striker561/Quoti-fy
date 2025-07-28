import { FeatureState } from "./shared";

export type QuotifyRequest = {
    image: string;
    quote: string;
    filter: string
};

export type QuotifyMetaData = {
    generatedImage: string,
    promptData: FeatureState,
    quotifyReq: QuotifyRequest,
}