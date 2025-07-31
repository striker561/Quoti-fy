import { withAuth } from "@/lib/authWrapper";
import { apiResponse } from "@/lib/generic";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { generateQuote } from "@/services/QuoteGenService";
import { isHttpError } from "@/lib/errors";

export const POST = withAuth(async (user: User, req: NextRequest) => {
    try {

        const data = await req.json();
        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

        const result = await generateQuote({
            user: user,
            data,
            ip,
        });
        return apiResponse(200, "Quote generated", result);
    } catch (err:unknown) {
        console.error(err);
        if (isHttpError(err)) {
            return apiResponse(err.status, err.message);
        }
        return apiResponse(500, "Something went wrong");
    }
});
