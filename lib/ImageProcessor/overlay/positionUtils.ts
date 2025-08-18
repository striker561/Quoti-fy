export function getPosition(
    pos: string,
    width: number,
    height: number,
    lines: number,
    fontSize: number
) {
    const lineHeight = lines * fontSize;
    const padding = 40;
    const bottomLeeway = 20;

    const positions: Record<
        string,
        { x: number; y: number; anchor: "start" | "end" | "middle" }
    > = {
        "top-left": { x: padding, y: padding + fontSize, anchor: "start" },
        "top": { x: width / 2, y: padding + fontSize, anchor: "middle" },
        "top-right": { x: width - padding, y: padding + fontSize, anchor: "end" },
        "left": {
            x: padding,
            y: height / 2 - lineHeight / 2 + fontSize,
            anchor: "start",
        },
        "center": {
            x: width / 2,
            y: height / 2 - lineHeight / 2 + fontSize,
            anchor: "middle",
        },
        "right": {
            x: width - padding,
            y: height / 2 - lineHeight / 2 + fontSize,
            anchor: "end",
        },
        "bottom-left": {
            x: padding,
            y: height - lineHeight - padding - bottomLeeway + fontSize,
            anchor: "start",
        },
        "bottom": {
            x: width / 2,
            y: height - lineHeight - padding - bottomLeeway + fontSize,
            anchor: "middle",
        },
        "bottom-right": {
            x: width - padding,
            y: height - lineHeight - padding - bottomLeeway + fontSize,
            anchor: "end",
        },
    };

    return positions[pos] ?? positions["center"];
}
