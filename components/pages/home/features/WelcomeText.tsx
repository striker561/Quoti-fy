import TypewriterFadeIn from "@/components/shared/TypeWritterEffect";
import { DaysList, MonthList } from "@/data/constants";

function getOrdinalSuffix(n: number): string {
  if (n >= 11 && n <= 13) return "th";
  const lastDigit = n % 10;
  return lastDigit === 1
    ? "st"
    : lastDigit === 2
    ? "nd"
    : lastDigit === 3
    ? "rd"
    : "th";
}

export default function WelcomeText() {
  const now = new Date();
  const dayOfWeek = DaysList[now.getDay()];
  const monthOfYear = MonthList[now.getMonth()];
  const dayOfMonth = now.getDate();
  const ordinal = getOrdinalSuffix(dayOfMonth);

  const timeText = `It is ${dayOfWeek}, ${monthOfYear} ${dayOfMonth}${ordinal},`;

  return (
    <div className="mb-6" role="presentation">
      <h2 className="font-medium text-[20px] lg:text-[25px] capitalize leading-relaxed">
        <TypewriterFadeIn text="Hi," delay={1} />
        <br />
        <TypewriterFadeIn text={timeText} delay={2.5} />
        <br />
        <TypewriterFadeIn text="How are you feeling today?" delay={4.5} />
      </h2>
    </div>
  );
}
