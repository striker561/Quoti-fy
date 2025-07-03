import TypewriterFadeIn from "@/components/global/TypeWritterEffect";
import { DaysList, MonthList } from "@/lib/constants";

function getOrdinalSuffix(n: number): string {
  if (n >= 11 && n <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function WelcomeText() {
  const now = new Date();

  const dayOfWeek = now.getDay();
  const dayOfMonth = now.getDate();
  const monthOfYear = now.getMonth();

  const ordinal = getOrdinalSuffix(dayOfMonth);

  const TimeText = `It is ${DaysList[dayOfWeek]}, ${MonthList[monthOfYear]} ${dayOfMonth}${ordinal},`;

  return (
    <div className="mb-5">
      <h2 className="font-medium text-[20px] lg:text-[25px] capitalize">
        <TypewriterFadeIn text="Hi," delay={1} />
        <br />
        <TypewriterFadeIn text={TimeText} delay={3} />
        <br />
        <TypewriterFadeIn text="How are you feeling today ?" delay={5} />
        <br />
      </h2>
    </div>
  );
}
