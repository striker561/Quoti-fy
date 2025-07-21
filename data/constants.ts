import { Position } from "@/lib/backend/ImageProcessor/types";

export const DEFAULT_MOOD_RANGE: number = 50;

export const DaysList: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export const MonthList: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const DefaultMoods: string[] = [
    "Focused",
    "Determined",
    "Loved",
    "Cheerful",
    "Funny",
    "Motivated",
    "Energetic",
    "Happy",
    "Romantic",
];

export const DefaultFilters: string[] = ["Original", "Nostalgic", "Old", "Pop"];
export type ImageFilter = (typeof DefaultFilters)[number];

export const POSITIONS: Position[] = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "center",
    "left",
    "right",
    "top",
    "bottom",
];