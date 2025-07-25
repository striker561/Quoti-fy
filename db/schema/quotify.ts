import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const quotifyEntries = pgTable("quotify_entries", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    quote: text("quote").notNull(),
    imageURL: text("imageURL"),
    promptData: jsonb("promptData").notNull(),
    quotifyReq: jsonb("quotifyReq").notNull(),
    details: jsonb("details").default(null),
    dateCreated: timestamp("dateCreated").notNull().defaultNow(),
});
