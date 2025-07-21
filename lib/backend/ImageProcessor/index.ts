import sharp from "sharp";
import { applyFilter } from "./filters";
import { generateOverlaySvg } from "./overlay/generateOverlaySvg";
import { QuotifyRequest } from "@/types/requests";
import { analyzeImageArea } from "./overlay/analyzeImageArea";
import { POSITIONS } from "@/data/constants";
import { Position } from "./types";

export async function processQuotifyRequest(data: QuotifyRequest): Promise<Buffer> {
    const imageBuffer = Buffer.from(
        data.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
    );

    const imageFile = sharp(imageBuffer);
    const { width, height } = await imageFile.metadata();

    // Apply filter first
    const imageWithFilter = applyFilter(data.filter, imageFile);
    const filteredImageBuffer = await imageWithFilter.clone().toBuffer();

    // Analyze color first (uses original image)
    const colorAnalysis = await analyzeImageArea(filteredImageBuffer, {
        x: width! / 4,
        y: height! / 4,
        w: width! / 2,
        h: height! / 2
    });

    const overlay = await generateOverlaySvg({
        text: data.quote,
        width,
        height,
        position: getRandomPosition(),
        addBackground: false,
        textColor: colorAnalysis.color
    });

    return imageWithFilter
        .composite([{ input: overlay }])
        .jpeg({ quality: 85, mozjpeg: true })
        .toBuffer();
}

function getRandomPosition(): Position {
    return POSITIONS[Math.floor(Math.random() * POSITIONS.length)];
}
