type GenerateButtonProps = {
  isActive: boolean;
  onClick?: () => void;
};

export default function GenerateButton({
  isActive,
  onClick,
}: GenerateButtonProps) {
  return (
    <div className="mt-9 flex justify-center">
      <button
        className={`px-6 py-3 rounded-full text-white font-semibold text-base lg:text-lg
          transition-all duration-300 ease-in-out shadow-lg w-full
          ${
            isActive
              ? "bg-gradient-to-r from-[#0C090D] via-[#2C1A4E] to-[#6320EE] hover:brightness-110 active:scale-95"
              : "bg-[#C2C2D6] cursor-not-allowed opacity-70"
          }
        `}
        disabled={!isActive}
        onClick={isActive ? onClick : undefined}
      >
        Generate Quote
      </button>
    </div>
  );
}
