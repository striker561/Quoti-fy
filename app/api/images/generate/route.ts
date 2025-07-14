import { withAuth } from "@/lib/backend/authWrapper";
import { getRedisClient } from "@/lib/backend/Redis/redis";
import { apiResponse, getSecondsTillMidnight, incrementQuotaWithExpiry } from "@/lib/generic";
import { buildImagePrompt } from "@/lib/backend/QuoteSystem/promptEngine";
import { generateImageWithGemini } from "@/lib/backend/QuoteSystem/providers/googleModel";
import { getLocationByIP } from "@/lib/backend/getLocationByIP";
import { getRandomImageBase64 } from "@/data/test/getRandomImage";
import { TEST_IMAGES_FOLDER } from "@/data/test/constants";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { FeatureState, MoodPromptInput } from "@/types/shared";
import { QuoteImageResponse } from "@/types/responses";

const IMAGE_DAILY_LIMIT = parseInt(process.env.MAX_IMAGE_PER_DAY ?? "3");

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const isTestMode = process.env.USE_TEST_QUOTES === "true";

        const redis = !isTestMode ? getRedisClient() : null;
        const today = new Date().toISOString().split("T")[0];
        const imageKey = `image_limit:${user.id}:${today}`;
        let updated = 0;

        if (!isTestMode && redis) {
            const used = parseInt(await redis.get(imageKey, "0") || "0", 10);

            if (used >= IMAGE_DAILY_LIMIT) {
                return apiResponse(429, "Image limit reached");
            }
        }

        const data = (await req.json()) as FeatureState;

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
        const locationData = ip ? await getLocationByIP(ip) : null;
        const location = locationData?.city && locationData?.country
            ? `${locationData.city}, ${locationData.country}`
            : "Unspecified";

        const prompt: MoodPromptInput = {
            mood: data.mood,
            moodScale: data.moodRange,
            imageStyle: data.moodImageStyle,
            timeOfDay: new Date().toISOString(),
            location: location,
        };

        let image: string | null = null;

        if (isTestMode) {
            await new Promise((resolve) => setTimeout(resolve, 2400));
            image = getRandomImageBase64(TEST_IMAGES_FOLDER);
        } else {
            const raw = await generateImageWithGemini(buildImagePrompt(prompt));
            image = raw?.startsWith("data:image") ? raw : `data:image/png;base64,${raw}`;
        }

        if (!isTestMode && redis) {
            updated = await incrementQuotaWithExpiry(redis, imageKey, 1, getSecondsTillMidnight()) as number;
        }

        const result: QuoteImageResponse = {
            image: image,
            quota: {
                current: isTestMode ? 0 : updated,
                max: IMAGE_DAILY_LIMIT,
            },
        }

        return apiResponse(200, "Image generated", result);
    } catch (err) {
        console.error(err);
        return apiResponse(500, "Failed to generate image");
    }
});
