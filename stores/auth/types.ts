import { User } from "next-auth";

export interface AuthState {
    isAuthenticated: boolean;
    user?: User | null;
    isLoading: boolean;
    login: (userData: User) => void;
    logout: () => void;
    startLoading: () => void;
    stopLoading: () => void;
}