type GenerateButtonProp = {
  isActive: boolean;
  onClick?: () => void;
};

export default function GenerateButton({
  isActive,
  onClick,
}: GenerateButtonProp) {
  return (
    <div className="mt-[35px] flex justify-center">
      <button
        className={`h-[4rem] w-75 rounded-[30px] border-[0.5] border-white drop-shadow-lg cursor-pointer transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#0C090D] from-32% to-[#6320EE] to-62]"
                        : "bg-gray-400 cursor-not-allowed opacity-60"
                    }
                `}
        disabled={!isActive}
        onClick={onClick}
      >
        <span className="font-semibold text-[15px] lg:text-[20px] text-white">
          Generate Quote
        </span>
      </button>
    </div>
  );
}
