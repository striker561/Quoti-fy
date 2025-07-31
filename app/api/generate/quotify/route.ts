import { withAuth } from "@/lib/authWrapper";
import { apiResponse, } from "@/lib/generic";
import { QuotifyRequest } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { processQuotifyRequest } from "@/services/QuotifyService";
import { isHttpError } from "@/lib/errors";


export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = (await req.json()) as QuotifyRequest;

        const generatedImage = await processQuotifyRequest(data);

        return apiResponse(200, "Quote generated", {
            image: generatedImage,
        });
    } catch (err: unknown) {
        console.error(err);
        if (isHttpError(err)) {
            return apiResponse(err.status, err.message);
        }
        return apiResponse(500, "Something went wrong");
    }
});
