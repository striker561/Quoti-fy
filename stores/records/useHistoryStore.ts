import { create } from "zustand";
import { HistoryState } from "./types";
import { QuoteRecord } from "@/types/shared";

const useHistoryStore = create<HistoryState>((set) => ({
    history: [],
    setHistory: (data) => set({ history: data }),

    addHistory: (quote: QuoteRecord) => set((state) => {
        const dateKey = quote.dateCreated.split("T")[0];
        const history = state.history || [];

        const existingGroupIndex = history.findIndex(group => group.date === dateKey);
        if (existingGroupIndex !== -1) {
            const updatedGroup = {
                ...history[existingGroupIndex],
                record: [quote, ...history[existingGroupIndex].record],
            };
            const updatedHistory = [...history];
            updatedHistory[existingGroupIndex] = updatedGroup;
            return { history: updatedHistory };
        }
        const newGroup = {
            date: dateKey,
            record: [quote],
        };
        return { history: [newGroup, ...history] };
    }),

    removeHistory: (id) => set((state) => ({
        history: (state.history || [])
            .map(day => ({
                ...day,
                record: day.record.filter(q => q.id !== id)
            }))
            .filter(day => day.record.length > 0)
    })),
    clear: () => set({ history: [] })
}));

export default useHistoryStore;
