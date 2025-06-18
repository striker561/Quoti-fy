import React from "react";

interface PillButtonProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: "default" | "primary" | "secondary";
  disabled?: boolean;
}

const PillButton: React.FC<PillButtonProps> = ({
  label,
  isSelected = false,
  onClick,
  variant = "default",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm text-[12px]";

  const variantStyles = {
    default: `${
      isSelected
        ? "bg-grey-100 text-gray-800 hover:bg-[#CACFD6]"
        : "bg-[#fff] text-gray-600 hover:bg-gray-100"
    }`,
    primary: `${
      isSelected
        ? "bg-blue-600 text-white"
        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
    }`,
    secondary: `${
      isSelected
        ? "bg-[#6320EE] text-white hover:bg-[#0C090D]"
        : "bg-[#0C090D] text-white hover:bg-[#6320EE]"
    }`,
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default PillButton;
