"use server";
import { signIn } from "../handlers/auth";

export async function startSignIn(
  provider: string,
  redirectURL?: string
): Promise<string> {
  try {
    const auth = await signIn(provider, {
      redirect: false,
      callbackUrl: redirectURL,
    });

    return auth;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw new Error("Sign-in failed. Please try again.");
  }
}
