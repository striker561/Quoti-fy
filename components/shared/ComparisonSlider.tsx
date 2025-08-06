"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

// USED AI FOR THIS COMPONENT, DIDN'T WANNA USE A LIB

interface ImageComparisonSliderProps {
    before: string;
    after: string;
    width?: number;
    height?: number;
}

export default function ImageComparisonSlider({
    before,
    after,
    width = 1000,
    height = 600,
}: ImageComparisonSliderProps) {
    const [position, setPosition] = useState(50);
    const [loadedBefore, setLoadedBefore] = useState(false);
    const [loadedAfter, setLoadedAfter] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handlePointerMove = (clientX: number) => {
        const bounds = containerRef.current?.getBoundingClientRect();
        if (!bounds) return;
        const newPos = ((clientX - bounds.left) / bounds.width) * 100;
        setPosition(Math.max(0, Math.min(100, newPos)));
    };

    useEffect(() => {
        const handlePointerUp = () => (isDragging.current = false);
        const handlePointerMoveEvent = (e: PointerEvent) => {
            if (isDragging.current) handlePointerMove(e.clientX);
        };
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointermove", handlePointerMoveEvent);
        return () => {
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointermove", handlePointerMoveEvent);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full max-w-3xl mx-auto overflow-hidden cursor-ew-resize select-none rounded-xl"
            style={{ aspectRatio: `${width}/${height}` }}
            onPointerDown={(e) => {
                isDragging.current = true;
                handlePointerMove(e.clientX);
            }}
        >
            {/* AFTER image (right side) */}
            <div
                className="absolute top-0 left-0 h-full"
                style={{
                    width: `${100 - position}%`,
                    left: `${position}%`,
                }}
            >
                {!loadedAfter && (
                    <div className="absolute inset-0 bg-gray-300 animate-pulse z-10" />
                )}
                <Image
                    src={after}
                    alt="After"
                    fill
                    className="object-cover"
                    onLoadingComplete={() => setLoadedAfter(true)}
                />
            </div>

            {/* BEFORE image (left side) */}
            <div
                className="absolute top-0 left-0 h-full"
                style={{ width: `${position}%` }}
            >
                {!loadedBefore && (
                    <div className="absolute inset-0 bg-gray-300 animate-pulse z-10" />
                )}
                <Image
                    src={before}
                    alt="Before"
                    fill
                    className="object-cover"
                    onLoadingComplete={() => setLoadedBefore(true)}
                />
            </div>

            {/* SLIDER HANDLE with circle */}
            <div
                className="absolute top-0 h-full w-1 bg-[#d7dcf5] shadow-md touch-none"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
                <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-[#6320EE] border-2 border-[#A6B1E1] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow" />
            </div>
        </div>
    );
}
