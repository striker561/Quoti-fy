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
        className={`h-[4rem] w-75 rounded-[50px] border-[0.5] border-white drop-shadow-lg transition-all
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#0C090D] from-32% to-[#6320EE] to-62%"
                        : "bg-[#A6B1E1] cursor-not-allowed"
                    }
                `}
        disabled={!isActive}
        onClick={isActive ? onClick : undefined}
      >
        <span className="font-semibold text-[15px] lg:text-[20px] text-white">
          Generate Quote
        </span>
      </button>
    </div>
  );
}
