import { QuotifyMetaData } from "@/types/requests";
import crypto from "crypto";

export function hashMetadata(metaData: QuotifyMetaData): string {
    const raw = JSON.stringify(metaData);
    return crypto.createHash("sha256").update(raw).digest("hex");
}
