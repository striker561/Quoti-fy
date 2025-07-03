import { withAuth } from "@/lib/backend/authWrapper";
import { apiResponse } from "@/lib/generic";
import { User } from "next-auth";
import { NextRequest } from "next/server";

export const POST = withAuth(async (user: User, req: NextRequest) => {
  try {
    const data = await req.json();

    return apiResponse(200, "Data retrieved successfully", data);
  } catch (e: unknown) {
    console.log(e);
    return apiResponse(400, "Something went wrong");
  }
});
