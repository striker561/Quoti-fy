import { auth } from "@/handlers/auth";
import { User } from "next-auth";
import { NextRequest } from "next/server";

// This gives more refine control over auth, used it intentionally instead of middle ware 😉
export function withAuth(
  handler: (user: User, req: NextRequest) => Promise<Response>
) {
  return async (req: NextRequest): Promise<Response> => {
    const session = await auth();

    if (!session?.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return handler(session.user, req);
  };
}
