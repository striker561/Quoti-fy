export function fitTextToBox(
    text: string,
    maxWidth: number,
    maxHeight: number,
): { lines: string[]; fontSize: number } {
    const words = text.split(" ");

    const maxFontSize = 20;
    const minFontSize = 10;
    let fontSize = maxFontSize;

    let bestFit: { lines: string[]; fontSize: number } = { lines: [], fontSize: minFontSize };

    while (fontSize >= minFontSize) {
        const maxCharsPerLine = Math.floor(maxWidth / (fontSize * 0.6));
        const lines: string[] = [];
        let currentLine = "";

        for (const word of words) {
            if ((currentLine + word).length > maxCharsPerLine) {
                lines.push(currentLine.trim());
                currentLine = "";
            }
            currentLine += word + " ";
        }
        if (currentLine.trim()) lines.push(currentLine.trim());

        const textBlockHeight = lines.length * fontSize * 1.2;

        if (textBlockHeight <= maxHeight) {
            bestFit = { lines, fontSize };
            break;
        }

        fontSize -= 2; 
    }

    return bestFit;
}
