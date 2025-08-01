export interface UIState {
    isLoading: boolean;
    error?: Error | null | unknown;
    setError: (error: Error | unknown) => void
    startLoading: () => void;
    stopLoading: () => void;
}