import WelcomeText from "./feature/WelcomeText";
import MoodInput from "./feature/MoodInput";
import MoodSlider from "./feature/MoodSlider";
import MoodImageStyle from "./feature/ImageStyle";
import MoodFilterSelect from "./feature/FilterSelect";
import GenerateButton from "./feature/GenerateBtn";

export default function FeatureFrame() {
  return (
    <div className="mt-20 mb-50">
      <div className="mr-[250px] ml-[250px]">
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
