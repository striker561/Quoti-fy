export type APIResponse = {
    message: string;
    data: [] | object | null;
};

export type Quota = {
    current: number | null;
    max: number;
}

export type QuoteImageResponse = {
    image: string | null;
    quota: Quota;
}

export type QuoteResponse = {
    quotes: string[] | null;
    quota: Quota;
}

export type QuotifyResponse = {
    image: string;
}