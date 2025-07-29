import { pgTable, uuid, text, jsonb, timestamp, uniqueIndex, integer } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const quotifyEntries = pgTable("tbl_quotify_records", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    quote: text("quote").notNull(),
    imageURL: jsonb("imagesURL").notNull(),
    promptData: jsonb("promptData").notNull(),
    quotifyReq: jsonb("quotifyReq").notNull(),
    details: jsonb("details").default(null),
    metaHash: text("metaHash").notNull(),
    dateCreated: timestamp("dateCreated").notNull().defaultNow(),
}, (entries) => ({
    uniqueMetaPerUser: uniqueIndex("uq_user_meta").on(entries.userId, entries.metaHash),
}));