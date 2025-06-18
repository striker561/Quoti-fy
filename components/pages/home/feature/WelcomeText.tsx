import TypewriterFadeIn from "@/components/global/TypeWritterEffect";

const DaysList: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MonthList: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

  const TimeText = `It's ${DaysList[dayOfWeek]} ${dayOfMonth}${ordinal} ${MonthList[monthOfYear]},`;

  return (
    <div className="mb-5">
      <h2 className="font-medium text-[30px] capitalize">
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
