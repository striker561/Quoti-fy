export type FeatureState = {
  mood: string;
  moodRange: number;
  moodImageStyle: string;
  moodFilter: string;
};

export interface MoodPromptInput {
  mood: string;
  moodScale: number;
  imageStyle: string;
  timeOfDay: string;
  location?: string;
  event?: string | null;
}
