import { withAuth } from "@/lib/backend/authWrapper";
import { apiResponse, } from "@/lib/generic";
import { QuotifyMetaData } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";


export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = (await req.json()) as QuotifyMetaData;

        console.log(data)

        return apiResponse(200, "Quote saved successfully");
    } catch (err) {
        console.error(err);
        return apiResponse(500, "Failed to save quote");
    }
});
