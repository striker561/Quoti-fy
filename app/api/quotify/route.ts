import { withAuth } from "@/lib/backend/authWrapper";
import { apiResponse, } from "@/lib/generic";
import { QuotifyRequest } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = (await req.json()) as QuotifyRequest;

        // process the image
        console.log(data);

        return apiResponse(200, "Quote generated", {
            image: "yess"
        });
    } catch (err) {
        console.error(err);
        return apiResponse(500, "Failed to generate quote");
    }
});
