import { StorageService } from ".";

let storageInstance: StorageService | null = null;

export default function getStorageService(): StorageService {
    if (!storageInstance) {
        storageInstance = new StorageService(
            {
                accessKeyId: process.env.R2_ACCESS_KEY as string,
                bucket: process.env.R2_BUCKET as string,
                endpoint: process.env.R2_ENDPOINT as string,
                secretAccessKey: process.env.R2_ACCESS_KEY as string,
            }
        )
    }
    return storageInstance;
}