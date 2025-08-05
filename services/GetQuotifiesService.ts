import db from "@/db";
import { quotifyEntries } from "@/db/schema/quotify";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import { format } from "date-fns";
import { QuoteRecord, RecordGroupedByDay } from "@/types/shared";


export async function getQuotifiesData({ user }: { user: User }) {
    const userID = user.id as string;

    const data = await db
        .select({
            id: quotifyEntries.id,
            quote: quotifyEntries.quote,
            createdAt: quotifyEntries.dateCreated,
        })
        .from(quotifyEntries)
        .where(eq(quotifyEntries.userId, userID));

    const grouped: Record<string, QuoteRecord[]> = {};

    for (const entry of data) {
        const date = format(new Date(entry.createdAt), "yyyy-MM-dd");
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push({
            id: entry.id,
            quote: entry.quote,
            dateCreated: entry.createdAt instanceof Date ? entry.createdAt.toISOString() : String(entry.createdAt),
        });
    }

    const groupedArray: RecordGroupedByDay[] = Object.entries(grouped)
        .map(([date, entries]) => ({
            date,
            record: entries.sort(
                (a, b) =>
                    new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
            ),
        }))
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    return groupedArray;
}
