"use client";
import React, { useState, useEffect } from "react";
import "../../styles/typewriter.css";

interface TypewriterFadeInProp {
  text: string;
  delay: number;
  fadeDuration?: number;
}

const TypewriterFadeIn: React.FC<TypewriterFadeInProp> = ({
  text,
  delay,
  fadeDuration = 0.5,
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [charIndex, setCharIndex] = useState<number>(0);

  useEffect(() => {
    if (charIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, text, delay]);

  return (
    <span className="typewriter-container">
      {displayedText.split("").map((char, index) => (
        <span
          key={index}
          className="fade-in-char"
          style={{
            animationDelay: `${index * (delay / 1000)}s`,
            animationDuration: `${fadeDuration}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default TypewriterFadeIn;
