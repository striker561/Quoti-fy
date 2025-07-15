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
  const baseStyles = `
    px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 
    border border-transparent 
  `;

  const variantStyles = {
    default: isSelected
      ? "bg-[#6320EE] text-white hover:brightness-110"
      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200",

    primary: isSelected
      ? "bg-blue-600 text-white"
      : "bg-blue-100 text-blue-700 hover:bg-blue-200",

    secondary: isSelected
      ? "bg-[#6320EE] text-white hover:brightness-110"
      : "bg-[#0C090D] text-white hover:bg-[#6320EE] border border-white",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles}`}
    >
      {label}
    </button>
  );
};

export default PillButton;
