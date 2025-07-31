import { withAuth } from "@/lib/authWrapper";
import { apiResponse } from "@/lib/generic";
import { generateImage } from "@/services/ImageGenService";
import { User } from "next-auth";
import { NextRequest } from "next/server";

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {
        const data = await req.json();
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

        const result = await generateImage({
            user: user,
            data,
            ip,
        });

        return apiResponse(200, "Image generated", result)
    } catch (err) {
        console.error(err);
        const msg = err instanceof Error ? err.message : "Something went wrong";
        const status = msg.includes("limit") ? 429 : 500;
        return apiResponse(status, msg);
    }
});
