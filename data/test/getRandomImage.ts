import fs from "fs";
import path from "path";

const mimeTypes: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
};

export function getRandomImageBase64(folderPath: string): string | null {
  const absPath = path.resolve(folderPath);
  const files = fs.readdirSync(absPath).filter((file) => {
    const ext = path.extname(file).slice(1).toLowerCase();
    return Object.keys(mimeTypes).includes(ext);
  });

  if (files.length === 0) return null;

  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(absPath, randomFile);
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(randomFile).slice(1).toLowerCase();
  const mime = mimeTypes[ext];

  return `data:${mime};base64,${fileBuffer.toString("base64")}`;
}
