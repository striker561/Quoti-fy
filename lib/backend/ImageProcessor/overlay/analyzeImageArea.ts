import sharp from "sharp";

export async function analyzeImageArea(
    imageBuffer: Buffer,
    textArea: { x: number; y: number; w: number; h: number }
): Promise<{ color: string; luminance: number }> {
    const { x, y, w, h } = textArea;

    // Ensure dimensions are valid integers greater than 0
    const extractWidth = Math.max(1, Math.floor(w));
    const extractHeight = Math.max(1, Math.floor(h));

    const cropped = await sharp(imageBuffer)
        .extract({
            left: Math.floor(x),
            top: Math.floor(y),
            width: extractWidth,
            height: extractHeight,
        })
        .resize(1, 1, { fit: 'cover' })
        .raw()
        .toBuffer();

    const [r, g, b] = cropped;
    // Standard luminance formula
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return {
        luminance,
        color: luminance < 128 ? "#FFFFFF" : "#000000",
    };
}