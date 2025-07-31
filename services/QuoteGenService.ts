import { TEST_QUOTES } from "@/data/test/constants";
import { TooManyRequestsError } from "@/lib/errors";
import { getSecondsTillMidnight, incrementQuotaWithExpiry } from "@/lib/generic";
import { getLocationByIP } from "@/lib/getLocationByIP";
import { buildQuotePrompt } from "@/lib/QuoteSystem/promptEngine";
import { generateQuoteWithOpenAI } from "@/lib/QuoteSystem/providers/openAIModel";
import { getRedisClient } from "@/lib/Redis/redis";
import { QuoteResponse } from "@/types/responses";
import { FeatureState, MoodPromptInput } from "@/types/shared";
import { User } from "next-auth";


const QUOTE_DAILY_LIMIT = parseInt(process.env.MAX_QUOTE_PER_DAY ?? "10");
const QUOTE_PER_REQ = parseInt(process.env.QUOTE_PER_REQUEST ?? "2");

interface GenerateQuoteInput {
    user: User;
    data: FeatureState;
    ip?: string;
}


export async function generateQuote({
    user,
    data,
    ip,
}: GenerateQuoteInput): Promise<QuoteResponse> {

    const isTestMode = process.env.USE_TEST_QUOTES === "true";
    const redis = !isTestMode ? getRedisClient() : null;

    const today = new Date().toISOString().split("T")[0];
    const quoteKey = `quote_limit:${user.id}:${today}`;

    let updated = 0;
    if (!isTestMode && redis) {
        const used = parseInt(await redis.get(quoteKey, "0") || "0", 10);
        if (used >= QUOTE_DAILY_LIMIT) {
            throw new TooManyRequestsError("Quote limit reached");
        }
    }

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

    let quote: string[] | null = null;

    if (isTestMode) {
        await new Promise((resolve) => setTimeout(resolve, 2400));
        quote = TEST_QUOTES;
    } else {
        quote = await generateQuoteWithOpenAI(buildQuotePrompt(prompt));
    }


    if (!isTestMode && redis) {
        updated = await incrementQuotaWithExpiry(redis, quoteKey, QUOTE_PER_REQ, getSecondsTillMidnight()) as number;
    }

    return {
        quotes: quote,
        quota: {
            current: isTestMode ? 0 : updated,
            max: QUOTE_DAILY_LIMIT
        },
    }
}