import { withAuth } from "@/lib/authWrapper";
import { isHttpError } from "@/lib/errors";
import { apiResponse } from "@/lib/generic";
import { User } from "next-auth";
import { NextRequest } from "next/server";


export const DELETE = withAuth(async (user: User, req: NextRequest) => {
    try {
        // Implement later

        return apiResponse(200, "Account deleted successfully");
    } catch (err: unknown) {
        console.error(err);
        if (isHttpError(err)) {
            return apiResponse(err.status, err.message);
        }
        return apiResponse(500, "Something went wrong");
    }
});