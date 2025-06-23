import NextAuth from "next-auth";
import db from "../db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    maxAge: Number(process.env.JWT_LIFESPAN),
  },
  adapter: DrizzleAdapter(db),
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authOptions,
});
