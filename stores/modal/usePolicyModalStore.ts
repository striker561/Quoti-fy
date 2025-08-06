import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PolicyState } from "./types";

export const usePolicyStore = create<PolicyState>()(
    persist(
        (set) => ({
            hasAccepted: false,
            manualOpen: false,
            accept: () => set({ hasAccepted: true, manualOpen: false }),
            open: () => set({ manualOpen: true }),
            close: () => set({ manualOpen: false }),
        }),
        {
            name: "quotify-policy",
        }
    )
);