import WelcomeText from "./feature/WelcomeText";
import MoodInput from "./feature/MoodInput";
import MoodSlider from "./feature/MoodSlider";
import MoodImageStyle from "./feature/ImageStyle";
import MoodFilterSelect from "./feature/FilterSelect";
import GenerateButton from "./feature/GenerateBtn";

export default function FeatureFrame() {
  return (
    <div className="my-20 @container">
      <div className="mx-4 md:mx-[15rem] lg:mx-[15rem]">
        <WelcomeText />
        <MoodInput />
        <MoodSlider />
        <MoodImageStyle />
        <MoodFilterSelect />
        <GenerateButton />
      </div>
    </div>
  );
}
