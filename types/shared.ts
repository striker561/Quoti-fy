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

export type ApiResult = {
  message: string;
  data: [] | object | null;
};

export type QuoteResult = {
  generatedQuote: string[];
  generatedImage: string;
};

export type MoodResponseProps = {
  generateMood: (form: FeatureState) => Promise<QuoteResult>;
  isGenerating: boolean;
  error: string | null;
};

export type ModalInteractionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
