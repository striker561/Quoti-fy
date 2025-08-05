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
    imageURL: object | null;
    promptData: object | null;
    quotifyReq: object | null;
    dateCreated: Date;
};
