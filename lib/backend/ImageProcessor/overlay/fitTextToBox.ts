export function fitTextToBox(
    text: string,
    maxWidth: number,
    maxHeight: number,
    imageWidth: number
): { lines: string[]; fontSize: number } {
    const words = text.split(" ");

    let low = 20;
    let high = Math.floor(imageWidth / 20);
    let bestFit: { lines: string[]; fontSize: number } = { lines: [], fontSize: 20 };

    while (low <= high) {
        const fontSize = Math.floor((low + high) / 2);

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
            low = fontSize + 1;
        } else {
            high = fontSize - 1;
        }
    }

    return bestFit;
}
