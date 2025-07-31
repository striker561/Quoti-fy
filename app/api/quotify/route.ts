import { withAuth } from "@/lib/authWrapper";
import { apiResponse, } from "@/lib/generic";
import { QuotifyRequest } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { processQuotifyRequest } from "@/lib/ImageProcessor";


export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = (await req.json()) as QuotifyRequest;

        const finalImageBuffer = await processQuotifyRequest(data);

        const processedBase64 = `data:image/jpeg;base64,${finalImageBuffer.toString("base64")}`;

        return apiResponse(200, "Quote generated", {
            image: processedBase64,
        });
    } catch (err) {
        console.error(err);
        return apiResponse(500, "Failed to generate quote");
    }
});
