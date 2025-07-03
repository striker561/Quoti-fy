import { GoogleGenAI, Modality } from "@google/genai";

export async function generateImageWithGemini(
  prompt: string
): Promise<string | null> {
  const client = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY,
  });

  const response = await client.models.generateContent({
    model: process.env.GEMINI_IMAGE_GEN_MODEL
      ? process.env.GEMINI_IMAGE_GEN_MODEL
      : "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  if (response.candidates && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    if (candidate.content && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          const imageData = part.inlineData.data;
          if (typeof imageData === "string") {
            return imageData;
          }
        }
      }
    }
  }
  return null;
}
