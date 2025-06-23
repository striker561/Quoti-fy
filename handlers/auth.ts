import NextAuth from "next-auth";
import db from "../db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import { accounts, sessions, users } from "@/db/schema/auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    maxAge: Number(process.env.JWT_LIFESPAN || 60 * 60 * 24 * 7),
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions
  }),
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authOptions,
});
