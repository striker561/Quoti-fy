import db from "@/db";
import { quotifyEntries } from "@/db/schema/quotify";
import { HistoryResponse } from "@/types/responses";
import { and, eq } from "drizzle-orm";
import { User } from "next-auth";

export async function getQuoteRecordByID({ id, user }: { id: number, user: User }): Promise<HistoryResponse | null> {
    const userID = user.id as string;

    const data = await db
        .select({
            id: quotifyEntries.id,
            quote: quotifyEntries.quote,
            imageURL: quotifyEntries.imageURL,
            promptData: quotifyEntries.promptData,
            quotifyReq: quotifyEntries.quotifyReq,
            dateCreated: quotifyEntries.dateCreated
        })
        .from(quotifyEntries)
        .where(
            and(
                eq(quotifyEntries.userId, userID),
                eq(quotifyEntries.id, id)
            )
        );

    const entry = data[0];
    if (!entry) {
        return null;
    }

    return {
        id: entry.id,
        quote: entry.quote,
        imageURL: entry.imageURL as object,
        promptData: entry.promptData as object,
        quotifyReq: entry.quotifyReq as object,
        dateCreated: entry.dateCreated
    };
}