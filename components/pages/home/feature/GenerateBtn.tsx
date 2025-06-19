export default function GenerateButton() {
  return (
    <div className="mt-[35px] flex justify-center">
      <button className="bg-gradient-to-r from-[#0C090D] from-32% to-[#6320EE] to-62% h-[4rem] w-75 rounded-[30px] border-[0.5] border-white drop-shadow-lg cursor-pointer">
        <span className="font-semibold text-[15px] lg:text-[20px] text-white">
          Generate Quote
        </span>
      </button>
    </div>
  );
}
