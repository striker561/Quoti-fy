import { getPosition } from "./positionUtils";
import { fitTextToBox } from "./fitTextToBox";

type Position = "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "left"
    | "right"
    | "top"
    | "bottom";

interface OverlayOptions {
    text: string;
    textColor?: string;
    width: number;
    height: number;
    position?: Position;
    addBackground?: boolean;
}

// The following function and related logic were generated with AI assistance, you can adjust if you have a lot of experience
export async function generateOverlaySvg({
    text,
    width,
    height,
    position = "center",
    addBackground = true,
    textColor = "#ffffff",
}: OverlayOptions): Promise<Buffer> {
    const { lines: fittedLines, fontSize } = fitTextToBox(text, width, height, width - 100)
    const { x, y, anchor } = getPosition(position, width, height, fittedLines.length, fontSize);


    const bg = addBackground
        ? `<rect x="0" y="${y - fontSize}" width="${width}" height="${(fittedLines.length + 1) * fontSize}" fill="rgba(0,0,0,0.4)" />`
        : "";

    const svgLines = fittedLines
        .map((line, i) => {
            return `<text x="${x}" y="${y + i * fontSize}" text-anchor="${anchor}" class="quote">${line}</text>`;
        })
        .join("");

    const svg = `
    <svg width="${width}" height="${height}">
      <style>
        .quote {
          fill: ${textColor};
          font-size: ${fontSize}px;
          font-family: Georgia, 'Palatino Linotype', serif;
          font-weight: bold;
        }
      </style>
      ${bg}
      ${svgLines}
    </svg>
  `;

    return Buffer.from(svg);
}
