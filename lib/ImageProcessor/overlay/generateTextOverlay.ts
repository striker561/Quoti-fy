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

export function generateTextOverlay({
    text,
    width,
    height,
    position = "bottom",
    addBackground = true,
    textColor = "#ffffff",
}: OverlayOptions): Buffer {
    const { lines: fittedLines, fontSize } = fitTextToBox(
        text,
        width,
        height,
    );

    // Calculate positioning based on position parameter
    const lineHeight = fontSize * 1.3;
    const textHeight = fittedLines.length * lineHeight;
    const padding = 20;
    const overlayHeight = textHeight + (padding * 2);

    // Determine text alignment and x position based on position
    let textAnchor = "middle";
    let xPos = width / 2;

    if (position.includes("left")) {
        textAnchor = "start";
        xPos = padding;
    } else if (position.includes("right")) {
        textAnchor = "end";
        xPos = width - padding;
    }

    // Create contrast-aware stroke color (opposite of text color)
    const isLightText = textColor === "#ffffff" || textColor.toLowerCase() === "white";
    const strokeColor = isLightText ? "#000000" : "#ffffff";
    const strokeWidth = "2";

    // Create a minimal, reliable SVG
    const textElements = fittedLines.map((line, index) => {
        const y = padding + (index + 1) * lineHeight;

        // Escape XML characters properly
        const escapedLine = line
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        return `<text x="${xPos}" y="${y}" text-anchor="${textAnchor}" fill="${textColor}" stroke="${strokeColor}" stroke-width="${strokeWidth}" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: ${fontSize}px; font-weight: bold;">${escapedLine}</text>`;
    }).join('');

    const backgroundRect = addBackground ?
        `<rect width="${width}" height="${overlayHeight}" fill="rgba(0,0,0,0.6)"/>` : '';

    // Use the simplest possible SVG structure with system font stack
    const svg = `<svg width="${width}" height="${overlayHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>
                <![CDATA[
                @font-face {
                    font-family: 'fallback';
                    src: local('Arial'), local('Helvetica'), local('sans-serif');
                }
                ]]>
            </style>
        </defs>
        ${backgroundRect}
        ${textElements}
    </svg>`;

    return Buffer.from(svg);
}