import { create } from "zustand"
import { HistoryModalState } from "./types";

const useHistoryModalStore = create<HistoryModalState>((set) => ({
    open: false,
    selectedId: null,
    openModal: (id) => set({ open: true, selectedId: id }),
    closeModal: () => set({ open: false, selectedId: null }),
}));

export default useHistoryModalStore;