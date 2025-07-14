import { useCallback, useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import {
    ApiResult,
    FeatureState,
    ImageResponseProps,
    QuoteResponseProps,
} from "@/types/shared";
import { QuoteImageResponse, QuoteResponse } from "@/types/responses";



export function useGenerateQuote(): QuoteResponseProps {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateQuote = useCallback(
        async (form: FeatureState): Promise<QuoteResponse> => {
            setIsGenerating(true);
            setError(null);
            try {
                const result: ApiResult = await apiRequest({
                    method: "POST",
                    url: "/quotes/generate",
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


export function useGenerateImage(): ImageResponseProps {
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateImage = useCallback(
        async (form: FeatureState): Promise<QuoteImageResponse> => {
            setIsGenerating(true);
            setError(null);
            try {
                const result: ApiResult = await apiRequest({
                    method: "POST",
                    url: "/images/generate",
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
