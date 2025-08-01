import { GENERATED_IMAGE_PATH, ORIGINAL_IMAGE_PATH } from "@/data/constants";
import db from "@/db";
import { quotifyEntries } from "@/db/schema/quotify";
import { BadRequestError, InternalServerError } from "@/lib/errors";
import { hashMetadata } from "@/lib/generic";
import getStorageService, { base64ToBuffer } from "@/lib/S3Storage/client";
import { QuotifyMetaDataRequest } from "@/types/requests";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { User } from "next-auth";

interface SaveQuoteInput {
    user: User;
    data: QuotifyMetaDataRequest;
}

export async function saveQuotifyData({
    user,
    data,
}: SaveQuoteInput): Promise<boolean> {
    const userID = user.id as string;

    const metaHash = hashMetadata(data);
    const existing = await db
        .select({ id: quotifyEntries.id })
        .from(quotifyEntries)
        .where(
            and(
                eq(quotifyEntries.userId, userID),
                eq(quotifyEntries.metaHash, metaHash)
            )
        )
        .limit(1);

    if (existing.length > 0) {
        throw new BadRequestError("Quote is already saved")
    }

    // Prepare storage
    const storage = getStorageService();
    let originalImageURL: string;
    let generatedImageURL: string;

    try {
        originalImageURL = await storage.upload(
            `${userID}/${ORIGINAL_IMAGE_PATH}/${randomUUID()}`,
            base64ToBuffer(data.quotifyReq.image),
            "image/png",
            "public-read"
        );

        generatedImageURL = await storage.upload(
            `${userID}/${GENERATED_IMAGE_PATH}/${randomUUID()}`,
            base64ToBuffer(data.quotifyReq.image),
            "image/png",
            "public-read"
        );
    } catch (err) {
        console.error("Image upload failed:", err);
        throw new InternalServerError("Error saving quote");
    }

    try {
        await db.insert(quotifyEntries).values({
            userId: userID,
            quote: data.quotifyReq.quote,
            imageURL: {
                original: originalImageURL,
                generated: generatedImageURL,
            },
            promptData: data.promptData,
            quotifyReq: {
                filter: data.quotifyReq.filter,
                quote: data.quotifyReq.quote,
                image: "REDACTED",
            },
            metaHash,
        });
    } catch (err) {
        console.error("DB insert failed:", err);
        throw new InternalServerError("Error saving quote");
    }

    return true
}