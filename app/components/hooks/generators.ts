import { useCallback, useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import {
    FeatureState,
    ImageResponseProps,
    QuoteResponseProps,
    QuotifyResponseProp,
} from "@/types/shared";
import { APIResponse, QuoteImageResponse, QuoteResponse, QuotifyResponse } from "@/types/responses";
import { QuotifyRequest } from "@/types/requests";



export function UseGenerateQuote(): QuoteResponseProps {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateQuote = useCallback(
        async (form: FeatureState): Promise<QuoteResponse> => {
            setIsGenerating(true);
            setError(null);
            try {
                const result: APIResponse = await apiRequest({
                    method: "POST",
                    url: "/generate/quote",
                    data: form,
                });
                return result.data as QuoteResponse;
            } catch (error: unknown) {
                if (error instanceof Error) throw error;
                throw new Error("An unknown error occurred");
            } finally {
                setIsGenerating(false);
            }
        },
        []
    );

    return { generate: generateQuote, isGenerating, error };
}


export function UseGenerateImage(): ImageResponseProps {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImage = useCallback(
        async (form: FeatureState): Promise<QuoteImageResponse> => {
            setIsGenerating(true);
            setError(null);
            try {
                const result: APIResponse = await apiRequest({
                    method: "POST",
                    url: "/generate/image",
                    data: form,
                });
                return result.data as QuoteImageResponse;
            } catch (error: unknown) {
                if (error instanceof Error) throw error;
                throw new Error("An unknown error occurred");
            } finally {
                setIsGenerating(false);
            }
        },
        []
    );

    return { generate: generateImage, isGenerating, error };
}


export function UseQuotify(): QuotifyResponseProp {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const quotifyImage = useCallback(
        async (form: QuotifyRequest): Promise<QuotifyResponse> => {
            setIsLoading(true);
            setError(null);
            try {
                const result: APIResponse = await apiRequest({
                    method: "POST",
                    url: "/generate/quotify",
                    data: form
                })
                return result.data as QuotifyResponse;
            } catch (error: unknown) {
                if (error instanceof Error) throw error;
                throw new Error("An unknown error occurred");
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    return { quotify: quotifyImage, isLoading, error }
}