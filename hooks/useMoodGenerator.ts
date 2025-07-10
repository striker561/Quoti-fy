import { useCallback, useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import {
  ApiResult,
  FeatureState,
  MoodResponseProps,
  QuoteResult,
} from "@/types/shared";

export function useMoodGenerator(): MoodResponseProps {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMood = useCallback(
    async (form: FeatureState): Promise<QuoteResult> => {
      setIsGenerating(true);
      setError(null);
      try {
        const result: ApiResult = await apiRequest({
          method: "POST",
          url: "/quotes/generate",
          data: form,
        });
        return result.data as QuoteResult;
      } catch (error: unknown) {
        if (error instanceof Error) throw error;
        throw new Error("An unknown error occurred");
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return { generateMood, isGenerating, error };
}
