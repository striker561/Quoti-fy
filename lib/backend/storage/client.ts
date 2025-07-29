import { StorageService } from ".";

let storageInstance: StorageService | null = null;

export default function getStorageService(keyPrefix?: string): StorageService {
    if (!storageInstance) {
        storageInstance = new StorageService(
            {
                accessKeyId: process.env.R2_ACCESS_KEY as string,
                bucket: process.env.R2_BUCKET as string,
                endpoint: process.env.R2_ENDPOINT as string,
                secretAccessKey: process.env.R2_SECRET_KEY as string,
                keyPrefix: keyPrefix
            }
        )
    }
    return storageInstance;
}

export function base64ToBuffer(base64: string): Buffer {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(base64Data, "base64");
}
