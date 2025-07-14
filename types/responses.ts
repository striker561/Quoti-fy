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