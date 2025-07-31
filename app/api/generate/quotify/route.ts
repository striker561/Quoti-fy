import { withAuth } from "@/lib/authWrapper";
import { apiResponse, } from "@/lib/generic";
import { QuotifyRequest } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { processQuotifyRequest } from "@/services/QuotifyService";


export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = (await req.json()) as QuotifyRequest;

        const generatedImage = await processQuotifyRequest(data);

        return apiResponse(200, "Quote generated", {
            image: generatedImage,
        });
    } catch (err) {
        console.error(err);
        const msg = err instanceof Error ? err.message : "Something went wrong";
        return apiResponse(500, msg);
    }
});
