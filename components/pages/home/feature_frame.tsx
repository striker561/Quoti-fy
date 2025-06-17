import WelcomeText from "./feature/welcome_text";
import MoodInput from "./feature/mood_input";
import MoodSlider from "./feature/mood_slider";

export default function FeatureFrame() {
  return (
    <div className="mt-40">
      <div className="mr-[250px] ml-[250px]">
        <WelcomeText />
        <MoodInput />
        <MoodSlider />
      </div>
    </div>
  );
}
