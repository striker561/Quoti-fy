import { QuotePromptData } from "@/types/shared";

function describeIntensity(scale: number): string {
    if (scale < 20) return "very low intensity";
    if (scale < 40) return "low intensity";
    if (scale < 60) return "moderate intensity";
    if (scale < 80) return "high intensity";
    return "very high intensity";
}

function buildQuotePrompt(input: QuotePromptData): string {
    const intensity = describeIntensity(input.moodScale);
    return `
  Generate an emotionally moving quote that reflects a sense of ${input.mood
        } at ${intensity}.
  The tone should resonate with a ${input.imageStyle.toLowerCase()} visual style.
  ${input.event ? `Today is ${input.event}.` : ""}
  The quote should be short (max 20 words), poetic, and suitable for a visual post.
  `.trim();
}

function buildImagePrompt(input: QuotePromptData): string {
    const intensity = describeIntensity(input.moodScale);
    return `
  Create a ${input.imageStyle.toLowerCase()} background image that visually expresses ${input.mood
        } with ${intensity}.
  Avoid including any text.
  Incorporate elements of ${input.timeOfDay.toLowerCase()} lighting and atmosphere, appropriate for ${input.location
        }.
  Use colors and composition that evoke the specified mood.
  `.trim();
}

export { buildImagePrompt, buildQuotePrompt };
