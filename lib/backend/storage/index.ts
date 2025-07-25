import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

interface StorageServiceConfig {
    bucket: string;
    endpoint: string;
    region?: string;
    accessKeyId: string;
    secretAccessKey: string;
    keyPrefix?: string;
}

export class StorageService {
    private s3: S3Client;
    private bucket: string;
    private endpoint: string;
    private keyPrefix: string;

    constructor(config: StorageServiceConfig) {
        this.bucket = config.bucket;
        this.endpoint = config.endpoint.replace(/\/$/, "");
        this.keyPrefix = config.keyPrefix ? config.keyPrefix.replace(/\/$/, "") + "/" : "";
        this.s3 = new S3Client({
            region: config.region || "auto",
            endpoint: config.endpoint,
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            },
        });
    }

    async upload(fileName: string, buffer: Buffer, contentType = "application/octet-stream"): Promise<string> {
        const key = `${this.keyPrefix}${fileName}`;
        await this.s3.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        }));
        return `${this.endpoint}/${this.bucket}/${key}`;
    }

    async deleteByUrl(url: string) {
        const key = url.split(`${this.bucket}/`)[1];
        if (!key) throw new Error("Invalid file URL");
        await this.s3.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        }));
    }

    async deleteAllWithPrefix(prefix: string) {
        const fullPrefix = this.keyPrefix + prefix.replace(/^\//, "");
        const listed = await this.s3.send(new ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: fullPrefix,
        }));

        if (!listed.Contents?.length) return;

        for (const item of listed.Contents) {
            if (item.Key) {
                await this.s3.send(new DeleteObjectCommand({
                    Bucket: this.bucket,
                    Key: item.Key,
                }));
            }
        }
    }
}
