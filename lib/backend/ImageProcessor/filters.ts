import { Sharp } from "sharp"
import { DefaultFilters, ImageFilter } from "@/data/constants";

const imageFilterMap: Record<ImageFilter, (img: Sharp) => Sharp> = {
    Original: (img) => img,
    Nostalgic: (img) =>
        img
            .modulate({ brightness: 1.05, saturation: 0.4 })
            .tint({ r: 255, g: 230, b: 180 }),
    Old: (img) => img.grayscale(),
    Pop: (img) =>
        img.modulate({ brightness: 1.1, saturation: 1.8 }).sharpen(),
};


export function applyFilter(
    filter: string,
    image: Sharp
): Sharp {
    const key = DefaultFilters.includes(filter as ImageFilter)
        ? (filter as ImageFilter)
        : "Original";

    const filterFn = imageFilterMap[key];
    return filterFn(image);
}