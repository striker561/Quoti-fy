import { withAuth } from "@/lib/backend/authWrapper";
import {
  buildImagePrompt,
  buildQuotePrompt,
} from "@/lib/backend/QuoteSystem/promptEngine";
import { apiResponse } from "@/lib/generic";
import { FeatureState, MoodPromptInput } from "@/types/shared";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { generateQuoteWithOpenAI } from "@/lib/backend/QuoteSystem/providers/openAIModel";
import { getLocationByIP } from "@/lib/backend/getLocationByIP";
import { generateImageWithGemini } from "@/lib/backend/QuoteSystem/providers/gooogleModel";

export const POST = withAuth(async (user: User, req: NextRequest) => {
  try {
    const data = (await req.json()) as FeatureState;

    // Fetch IP
    const ip: string =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
    const userLocation = await getLocationByIP(ip);

    // Prepare Prompt
    const MoodPrompt = <MoodPromptInput>{
      mood: data.mood,
      moodScale: data.moodRange,
      imageStyle: data.moodImageStyle,
      timeOfDay: new Date().toISOString(),
      location:
        ip.length > 1
          ? `${userLocation?.city}, ${userLocation?.country}`
          : "Unspecified",
    };

    // Build Prompt
    const QuotePrompt = buildQuotePrompt(MoodPrompt);
    const ImagePrompt = buildImagePrompt(MoodPrompt);

    // Connect to Models
    const quote = await generateQuoteWithOpenAI(QuotePrompt);
    const image = await generateImageWithGemini(ImagePrompt);

    const result = {
      generatedQuote: quote,
      generatedImage: image,
    };

    console.log(result);

    return apiResponse(200, "Prompt Built Successfully", result);
  } catch (e: unknown) {
    console.log(e);
    return apiResponse(400, "Something went wrong");
  }
});
