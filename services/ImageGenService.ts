import { getRandomImageBase64 } from "@/data/test/getRandomImage";
import { getLocationByIP } from "@/lib/getLocationByIP";
import { getRedisClient } from "@/lib/Redis/redis";
import { QuoteReqData, QuotePromptData } from "@/types/shared";
import { User } from "next-auth";

import { TEST_IMAGES_FOLDER } from "@/data/test/constants";
import { getSecondsTillMidnight, incrementQuotaWithExpiry } from "@/lib/generic";
import { buildImagePrompt } from "@/lib/QuoteSystem/promptEngine";
import { generateImageWithGemini } from "@/lib/QuoteSystem/providers/googleModel";
import { QuoteImageResponse } from "@/types/responses";
import { TooManyRequestsError } from "@/lib/errors";

const IMAGE_DAILY_LIMIT = parseInt(process.env.MAX_IMAGE_PER_DAY ?? "3");

interface GenerateImageInput {
    user: User;
    data: QuoteReqData;
    ip?: string;
}

export async function generateImage({
    user,
    data,
    ip,
}: GenerateImageInput): Promise<QuoteImageResponse> {

    const isTestMode = process.env.USE_TEST_QUOTES === "true";
    const redis = !isTestMode ? getRedisClient() : null;

    const today = new Date().toISOString().split("T")[0];
    const imageKey = `image_limit:${user.id}:${today}`;

    let updated = 0;
    if (!isTestMode && redis) {
        const used = parseInt(await redis.get(imageKey, "0") || "0", 10);
        if (used >= IMAGE_DAILY_LIMIT) {
            throw new TooManyRequestsError("Image limit reached");
        }
    }

    const locationData = ip ? await getLocationByIP(ip) : null;
    const location = locationData?.city && locationData?.country
        ? `${locationData.city}, ${locationData.country}`
        : "Unspecified";

    const prompt: QuotePromptData = {
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

    return {
        image: image,
        quota: {
            current: isTestMode ? 0 : updated,
            max: IMAGE_DAILY_LIMIT,
        },
    }

}