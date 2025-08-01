import { create } from 'zustand';
import { AuthState } from './types';

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    login: (userData) => set({
        isAuthenticated: true,
        user: userData,
        isLoading: false,
    }),

    logout: () => set({
        isAuthenticated: false,
        user: null,
    }),

    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
}));


export default useAuthStore;