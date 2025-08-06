import { ImageURLDataRequest, QuotifyRequest } from "./requests";
import { QuoteReqData } from "./shared";

export type APIResponse = {
    message: string;
    data: [] | object | null;
};

export type UsageQuotaResponse = {
    current: number | null;
    max: number;
}

export type QuoteImageResponse = {
    image: string | null;
    quota: UsageQuotaResponse;
}

export type QuoteResponse = {
    quotes: string[] | null;
    quota: UsageQuotaResponse;
}

export type QuotifyResponse = {
    image: string;
}

export type HistoryResponse = {
    id: number;
    quote: string;
    imageURL: ImageURLDataRequest;
    promptData: QuoteReqData;
    quotifyReq: QuotifyRequest;
    dateCreated: Date;
};
