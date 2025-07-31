import sharp from "sharp";

export async function analyzeImageArea(
    image: sharp.Sharp, // Changed from Buffer to sharp.Sharp
    textArea: { x: number; y: number; w: number; h: number }
): Promise<{ color: string; luminance: number }> {
    const { x, y, w, h } = textArea;

    const { channels } = await image
        .clone()
        .extract({ left: Math.floor(x), top: Math.floor(y), width: Math.floor(w), height: Math.floor(h) })
        .stats();

    const r = channels[0].mean;
    const g = channels[1].mean;
    const b = channels[2].mean;

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return {
        luminance,
        color: luminance < 128 ? "#FFFFFF" : "#000000",
    };
}