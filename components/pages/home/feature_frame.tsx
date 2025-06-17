import WelcomeText from "./feature/welcome_text";
import MoodInput from "./feature/mood_input";
import MoodSlider from "./feature/mood_slider";
import MoodImageStyle from "./feature/image_style";
import MoodFilterSelect from "./feature/filter_select";
import GenerateButton from "./feature/generate_btn";

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
