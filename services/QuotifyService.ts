import sharp from "sharp";
import { QuotifyRequest } from "@/types/requests";
import { analyzeImageArea } from "@/lib/ImageProcessor/overlay/analyzeImageArea";
import { generateOverlaySvg } from "@/lib/ImageProcessor/overlay/generateOverlaySvg";
import { applyFilter } from "@/lib/ImageProcessor/filters";


export async function processQuotifyRequest(data: QuotifyRequest): Promise<string> {
    const imageBuffer = Buffer.from(
        data.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
    );

    const resizedImageBuffer = await sharp(imageBuffer)
        // Resizing improves performance but may reduce image quality and quote placement.
        // .resize({ width: 1024 })
        .toBuffer();

    const imagePipeline = sharp(resizedImageBuffer);


    const { width, height } = await imagePipeline.metadata();
    const colorAnalysis = await analyzeImageArea(imagePipeline, {
        x: width! / 4,
        y: height! / 4,
        w: width! / 2,
        h: height! / 2
    });

    const overlaySvgBuffer = generateOverlaySvg({
        text: data.quote,
        width,
        height,
        position: "bottom",
        addBackground: false,
        textColor: colorAnalysis.color
    });

    const finalImageBuffer = await applyFilter(data.filter, imagePipeline)
        .composite([{
            input: overlaySvgBuffer,
            tile: true
        }])
        .webp({ quality: 80 })
        .toBuffer();

    return `data:image/jpeg;base64,${finalImageBuffer.toString("base64")}`;
}