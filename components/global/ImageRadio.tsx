import React from "react";
import Image, { StaticImageData } from "next/image";

interface ImageRadioProps {
  id: string;
  name: string;
  value: string;
  selected: boolean;
  imageUrl: StaticImageData;
  label: string;
  size?: number;
  imageFit?: "cover" | "contain" | "none";
  showOverlay?: boolean;
  textColor?: string;
  onSelect?: (value: string) => void;
}

const ImageRadio: React.FC<ImageRadioProps> = ({
  id,
  name,
  value,
  selected,
  imageUrl,
  label,
  size = 150,
  imageFit = "cover",
  showOverlay = true,
  textColor = "white",
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect?.(value)}
      className={`
                relative
                cursor-pointer
                transition-all
                duration-200
                ${
                  selected
                    ? "border-3 border-[#6320EE]"
                    : "border border-gray-300"
                }
                rounded-lg
                overflow-hidden
                mt-[15px]
            `}
      style={{ width: size * 1.3, height: size }}
    >
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={label}
          fill
          className={`transition-transform duration-200 hover:scale-105`}
          style={{ objectFit: imageFit }}
        />
        {showOverlay && <div className="absolute inset-0 bg-[#D9D9D9]/30 " />}
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <p className="text-center font-medium" style={{ color: textColor }}>
            {label}
          </p>
        </div>
      </div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={selected}
        onChange={() => onSelect?.(value)}
        className="sr-only"
      />
    </div>
  );
};

export default ImageRadio;
