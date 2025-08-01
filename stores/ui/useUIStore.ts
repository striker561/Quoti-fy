import { create } from "zustand";
import { UIState } from "./types";

const useUIStore = create<UIState>((set) => ({
    isLoading: false,
    error: null,

    setError: (error) => set({
        error: error
    }),
    
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
}));

export default useUIStore