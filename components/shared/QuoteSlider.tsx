"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface QuoteSliderProps {
  quotes: string[];
  onQuoteChange?: (quote: string, index: number) => void;
}

export default function QuoteSlider({
  quotes,
  onQuoteChange,
}: QuoteSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const swipe = info.offset.x;

    if (swipe < -50 && currentIndex < quotes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (swipe > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (onQuoteChange) {
      onQuoteChange(quotes[currentIndex], currentIndex);
    }
  }, [currentIndex, quotes, onQuoteChange]);

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      <div className="relative min-h-[100px] px-4 overflow-clip">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <p className="text-sm font-medium italic text-gray-800 dark:text-gray-200">
              “{quotes[currentIndex]}”
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center gap-2">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? "bg-primary scale-150"
                : "bg-[#D9D9D9] hover:bg-primary/50"
            }`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to quote ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
