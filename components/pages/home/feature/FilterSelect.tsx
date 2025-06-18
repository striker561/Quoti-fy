import PillButton from "@/components/global/PillButton";

const DefaultFilters = ["Original", "Nostalgic", "Old", "Pop"];

export default function MoodFilterSelect() {
  return (
    <div className="mt-[25px] mb-[30px]">
      <h1 className="font-medium text-[25px]">Finally the filter !</h1>
      <div className="mt-3 flex overflow-auto scrollbar-hide">
        {DefaultFilters.map((mood) => (
          <PillButton key={mood} label={mood} variant="secondary" />
        ))}
      </div>
    </div>
  );
}
