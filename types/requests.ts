import { QuoteReqData } from "./shared";

export type QuotifyRequest = {
    image: string;
    quote: string;
    filter: string
};

export type QuotifyMetaDataRequest = {
    generatedImage: string,
    promptData: QuoteReqData,
    quotifyReq: QuotifyRequest,
}