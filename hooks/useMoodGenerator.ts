import { useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { FeatureState } from "@/types/shared";

export function useMoodGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMood = async (form: FeatureState) => {
    setIsGenerating(true);
    setError(null);

    try {
      const result = await apiRequest({
        method: "POST",
        url: "/quotes/generate",
        data: form,
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unknown error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateMood, isGenerating, error };
}
