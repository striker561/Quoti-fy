import { withAuth } from "@/lib/authWrapper";
import { getRedisClient } from "@/lib/Redis/redis";
import { apiResponse, getSecondsTillMidnight, incrementQuotaWithExpiry } from "@/lib/generic";
import { buildQuotePrompt } from "@/lib/QuoteSystem/promptEngine";
import { generateQuoteWithOpenAI } from "@/lib/QuoteSystem/providers/openAIModel";
import { getLocationByIP } from "@/lib/getLocationByIP";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { FeatureState, MoodPromptInput } from "@/types/shared";
import { TEST_QUOTES } from "@/data/test/constants";
import { QuoteResponse } from "@/types/responses";

const QUOTE_DAILY_LIMIT = parseInt(process.env.MAX_QUOTE_PER_DAY ?? "10");
const QUOTE_PER_REQ = parseInt(process.env.QUOTE_PER_REQUEST ?? "2");

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {

        const isTestMode = process.env.USE_TEST_QUOTES === "true";

        const redis = !isTestMode ? getRedisClient() : null;
        const today = new Date().toISOString().split("T")[0];
        const quoteKey = `quote_limit:${user.id}:${today}`;
        let updated = 0;


        if (!isTestMode && redis) {
            const used = parseInt(await redis.get(quoteKey, "0") || "0", 10);
            if (used >= QUOTE_DAILY_LIMIT) {
                return apiResponse(429, "Quote limit reached");
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
        const result: QuoteResponse = {
            quotes: quote,
            quota: {
                current: isTestMode ? 0 : updated,
                max: QUOTE_DAILY_LIMIT
            },
        }
        return apiResponse(200, "Quote generated", result);
    } catch (err) {
        console.error(err);
        return apiResponse(500, "Failed to generate quote");
    }
});
