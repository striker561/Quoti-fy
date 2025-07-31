import { withAuth } from "@/lib/authWrapper";
import { isHttpError } from "@/lib/errors";
import { apiResponse, } from "@/lib/generic";
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
