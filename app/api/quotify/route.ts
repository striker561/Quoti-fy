import { withAuth } from "@/lib/authWrapper";
import { isHttpError } from "@/lib/errors";
import { apiResponse, } from "@/lib/generic";
import { getQuoteRecordByID } from "@/services/RecordService";
import { getQuotifiesData } from "@/services/GetQuotifiesService";
import { saveQuotifyData } from "@/services/SaveQuotifyService";
import { QuotifyMetaDataRequest } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = (await req.json()) as QuotifyMetaDataRequest;

        await saveQuotifyData({
            user: user,
            data: data
        })

        return apiResponse(200, "Quote saved successfully");
    } catch (err: unknown) {
        console.error(err);
        if (isHttpError(err)) {
            return apiResponse(err.status, err.message);
        }
        return apiResponse(500, "Something went wrong");
    }
});

export const GET = withAuth(async (user: User, req: NextRequest) => {
    try {
        const quoteID = req.nextUrl.searchParams.get("id");

        if (!quoteID) {
            const data = await getQuotifiesData({ user });
            return apiResponse(200, "Quotes retrieved successfully", data ?? []);
        }

        if (isNaN(Number(quoteID))) {
            return apiResponse(400, "Invalid quote ID");
        }

        const data = await getQuoteRecordByID({ id: Number(quoteID), user });
        if (!data) {
            return apiResponse(404, "Quote not found");
        }

        return apiResponse(200, "Quote retrieved successfully", data);
    } catch (err: unknown) {
        console.error(err);
        if (isHttpError(err)) {
            return apiResponse(err.status, err.message);
        }
        return apiResponse(500, "Something went wrong");
    }
});
