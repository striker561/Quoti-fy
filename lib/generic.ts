import { NextResponse } from "next/server";
import { getRedisClient } from "./Redis/redis";
import toast from "react-hot-toast"
import { QuotifyMetaDataRequest } from "@/types/requests";
import crypto from "crypto";


export function apiResponse(
    code: number = 200,
    msg: string = "",
    data: null | [] | object = []
): NextResponse {
    return NextResponse.json({ message: msg, data: data }, { status: code });
}

export function getSecondsTillMidnight(): number {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

export async function incrementQuotaWithExpiry(redis: ReturnType<typeof getRedisClient>, key: string, increment: number, ttlSeconds: number) {
    const exists = await redis.exists(key);
    const newUsage = await redis.incrBy(key, increment);
    if (!exists) {
        await redis.setExp(key, ttlSeconds);
    }
    return newUsage;
}

export function toastSuccess(message: string) {
    return toast.success(message)
}

export function toastFailure(message: string) {
    return toast.error(message)
}

export function copyToClipBoard(string: string) {
    navigator.clipboard.writeText(string)
    toastSuccess('Copied')
}

export function shareUsingShareAPI({
    title,
    text,
    url,
}: {
    title: string;
    text: string;
    url: string
}) {
    const isWebShareAvailable =
        typeof navigator !== "undefined" && navigator.share;
    if (isWebShareAvailable) {

        navigator.share({
            title: title,
            text: text,
            url: url
        })
    }
}

export function hashMetadata(metaData: QuotifyMetaDataRequest): string {
    const raw = JSON.stringify(metaData);
    return crypto.createHash("sha256").update(raw).digest("hex");
}

export async function downloadImage(imageUrl: string, filename?: string): Promise<void> {
    try {
        const res = await fetch(imageUrl);
        if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);

        const blob = await res.blob();

        // Ensure it's PNG for consistency
        const pngBlob =
            blob.type === "image/png"
                ? blob
                : await blob.arrayBuffer().then(
                    (buffer) => new Blob([buffer], { type: "image/png" })
                );

        const link = document.createElement("a");
        link.href = URL.createObjectURL(pngBlob);
        link.download =
            filename || `quotify-${new Date().toISOString().slice(0, 10)}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
    } catch (err) {
        console.error("Download failed:", err);
        throw err; // Let caller handle toasts or other UI feedback
    }
}

