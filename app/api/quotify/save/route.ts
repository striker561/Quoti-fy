import { withAuth } from "@/lib/backend/authWrapper";
import { hashMetadata } from "@/lib/backend/generic";
import { apiResponse, } from "@/lib/generic";
import { QuotifyMetaData } from "@/types/requests";
import { User } from "next-auth";
import { NextRequest } from "next/server";
import { eq, and } from "drizzle-orm";
import { quotifyEntries } from "@/db/schema/quotify";
import getStorageService, { base64ToBuffer } from "@/lib/backend/storage/client";
import { GENERATED_IMAGE_PATH, ORIGINAL_IMAGE_PATH } from "@/data/constants";
import { randomUUID } from "crypto";
import db from "@/db";

export const POST = withAuth(async (user: User, req: NextRequest) => {
    const userID = user.id as string;

    try {
        const data = (await req.json()) as QuotifyMetaData;

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
            return apiResponse(400, "Quote is already saved");
        }
        // Prepare storage
        const storage = getStorageService();

        let originalImageURL: string;
        let generatedImageURL: string;

        try {
            originalImageURL = await storage.upload(
                `${userID}/${ORIGINAL_IMAGE_PATH}/${randomUUID()}`,
                base64ToBuffer(data.quotifyReq.image),
            );

            generatedImageURL = await storage.upload(
                `${userID}/${GENERATED_IMAGE_PATH}/${randomUUID()}`,
                base64ToBuffer(data.quotifyReq.image),
            );
        } catch (err) {
            console.error("Image upload failed:", err);
            return apiResponse(500, "Image upload failed");
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
            return apiResponse(500, "Failed to save quote entry");
        }

        return apiResponse(200, "Quote saved successfully");
    } catch (err) {
        console.error(err);
        return apiResponse(500, "Failed to save quote");
    }
});
