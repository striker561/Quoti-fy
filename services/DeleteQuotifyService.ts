import db from "@/db";
import { quotifyEntries } from "@/db/schema/quotify";
import { BadRequestError, InternalServerError } from "@/lib/errors";
import getStorageService from "@/lib/S3Storage/client";
import { ImageURLDataRequest } from "@/types/requests";
import { and, eq } from "drizzle-orm";
import { User } from "next-auth";
import { NextRequest } from "next/server";

interface DeleteQuoteInput {
    user: User;
    req: NextRequest;
}

export async function deleteQuotifyData({
    user,
    req,
}: DeleteQuoteInput): Promise<boolean> {
    const userID = user.id as string;

    const data = await req.json()
    const quoteID = Number(data.id);

    if (!quoteID || isNaN(quoteID)) {
        throw new BadRequestError("Invalid quote id")
    }


    const existing = await db
        .select({
            id: quotifyEntries.id,
            imageURL: quotifyEntries.imageURL,
        })
        .from(quotifyEntries)
        .where(and(
            eq(quotifyEntries.userId, userID),
            eq(quotifyEntries.id, quoteID)
        ));

    if (existing.length === 0) {
        throw new BadRequestError("Quote not found");
    }

    // Delete images first
    const storage = getStorageService();
    const imageKeys = existing[0].imageURL as ImageURLDataRequest;

    try {
        await storage.deleteByKey(imageKeys.generated);
        await storage.deleteByKey(imageKeys.original);
    } catch (err) {
        console.error("Image deletion failed:", err);
        throw new InternalServerError("Error deleting images");
    }

    try {
        await db
            .delete(quotifyEntries)
            .where(and(eq(quotifyEntries.id, quoteID), eq(quotifyEntries.userId, userID)));
        return true;
    } catch (err) {
        console.error("DB deletion failed:", err);
        throw new InternalServerError("Error deleting record");
    }
}