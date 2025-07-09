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
import { TEST_IMAGES_FOLDER, TEST_QUOTES } from "@/data/test/constants";
import { getRandomImageBase64 } from "@/data/test/getRandomImage";

export const POST = withAuth(async (user: User, req: NextRequest) => {
  try {
    let quote: string[];
    let image: string | null;

    if (process.env.TEST_QUOTES == "false") {
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
      quote = await generateQuoteWithOpenAI(QuotePrompt);
      image = await generateImageWithGemini(ImagePrompt);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      quote = TEST_QUOTES;
      //Images are in .gitignore, you can add more on this folder
      image = getRandomImageBase64(TEST_IMAGES_FOLDER);
    }

    const result = {
      generatedQuote: quote,
      generatedImage: image,
    };

    return apiResponse(200, "Prompt Built Successfully", result);
  } catch (e: unknown) {
    console.log(e);
    return apiResponse(400, "Something went wrong");
  }
});
