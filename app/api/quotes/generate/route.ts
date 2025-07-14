import { TEST_IMAGES_FOLDER, TEST_QUOTES } from "@/data/test/constants";
import { getRandomImageBase64 } from "@/data/test/getRandomImage";
import { withAuth } from "@/lib/backend/authWrapper";
import { getLocationByIP } from "@/lib/backend/getLocationByIP";
import {
    buildImagePrompt,
    buildQuotePrompt,
} from "@/lib/backend/QuoteSystem/promptEngine";
import { generateImageWithGemini } from "@/lib/backend/QuoteSystem/providers/googleModel";
import { generateQuoteWithOpenAI } from "@/lib/backend/QuoteSystem/providers/openAIModel";
import { getRedisClient } from "@/lib/backend/Redis/redis";
import { apiResponse, getSecondsTillMidnight, incrementQuotaWithExpiry } from "@/lib/generic";
import { FeatureState, MoodPromptInput, QuoteResult } from "@/types/shared";
import { User } from "next-auth";
import { NextRequest } from "next/server";

// Quota Data
const QUOTE_DAILY_LIMIT = parseInt(
    process.env.MAX_QUOTE_PER_DAY ? process.env.MAX_QUOTE_PER_DAY : "10"
);
const QUOTE_PER_REQ = parseInt(
    process.env.QUOTE_PER_REQUEST ? process.env.QUOTE_PER_REQUEST : "2"
)
const IMAGE_DAILY_LIMIT = parseInt(
    process.env.MAX_IMAGE_PER_DAY ? process.env.MAX_IMAGE_PER_DAY : "3"
);

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {

        const redis = getRedisClient();
        const today = new Date().toISOString().split("T")[0];
        const quoteKey = `quote_limit:${user.id}:${today}`;
        const imageKey = `image_limit:${user.id}:${today}`;

        const quoteUsed = parseInt(await redis.get(quoteKey, "0") || "0", 10);
        const imageUsed = parseInt(await redis.get(imageKey, "0") || "0", 10);

        let quote: string[] | null = null;
        let image: string | null = null;

        const isTestMode = process.env.USE_TEST_QUOTES === "true";

        if (isTestMode) {
            const data = (await req.json()) as FeatureState;

            // Fetch IP
            const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
            const locationData = ip ? await getLocationByIP(ip) : null;
            const location = locationData?.city && locationData?.country
                ? `${locationData.city}, ${locationData.country}`
                : "Unspecified";;

            // Prepare Prompt
            const moodPrompt: MoodPromptInput = {
                mood: data.mood,
                moodScale: data.moodRange,
                imageStyle: data.moodImageStyle,
                timeOfDay: new Date().toISOString(),
                location: location,
            };

            // Connect to Models
            if (quoteUsed < QUOTE_DAILY_LIMIT) {
                quote = await generateQuoteWithOpenAI(buildQuotePrompt(moodPrompt));
            }

            if (imageUsed < IMAGE_DAILY_LIMIT) {
                const rawImage = await generateImageWithGemini(buildImagePrompt(moodPrompt));
                image = rawImage?.startsWith("data:image") ? rawImage : `data:image/png;base64,${rawImage}`;
            }
        } else {
            await new Promise((r) => setTimeout(r, 2400));

            if (quoteUsed < QUOTE_DAILY_LIMIT) {
                quote = TEST_QUOTES;
            }

            if (imageUsed < IMAGE_DAILY_LIMIT) {
                image = getRandomImageBase64(TEST_IMAGES_FOLDER);
            }
        }

        const ttl = getSecondsTillMidnight();

        if (quote) {
            await incrementQuotaWithExpiry(redis, quoteKey, QUOTE_PER_REQ, ttl);
        }

        if (image) {
            await incrementQuotaWithExpiry(redis, imageKey, QUOTE_PER_REQ, ttl);
        }

        const result: QuoteResult = {
            generatedQuote: quote,
            generatedImage: image,
            quota: {
                quote: {
                    current: Math.min(quoteUsed + (quote ? QUOTE_PER_REQ : 0), QUOTE_DAILY_LIMIT),
                    max: QUOTE_DAILY_LIMIT,
                },
                image: {
                    current: Math.min(imageUsed + (image ? QUOTE_PER_REQ : 0), IMAGE_DAILY_LIMIT),
                    max: IMAGE_DAILY_LIMIT,
                },
            },
        };

        return apiResponse(200, "Prompt Built Successfully", result);
    } catch (e: unknown) {
        console.log(e);
        return apiResponse(400, "Something went wrong");
    }
});
