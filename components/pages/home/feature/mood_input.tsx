import PillButton from "@/components/global/pill_buttons";

const DefaultMoods = [
  "Focused",
  "Determined",
  "Loved",
  "Cheerful",
  "Funny",
  "Motivated",
  "Energetic",
  "Happy",
  "Romantic",
];

export default function MoodInput() {
  return (
    <div className="p-3 bg-[#A6B1E1] rounded-[20px]">
      <input
        type="text"
        placeholder="One Word...."
        className="outline-none w-full h-[86px] text-[35px] placeholder:text-[#CACFD6]"
      />
      <hr className="w-full h-[5px]" />
      <div className="mt-3 flex overflow-auto scrollbar-hide">
        {DefaultMoods.map((mood) => (
          <PillButton key={mood} label={mood} />
        ))}
      </div>
    </div>
  );
}
