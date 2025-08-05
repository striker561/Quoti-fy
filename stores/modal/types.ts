export interface HistoryModalState {
    open: boolean;
    selectedId: number | null;
    openModal: (id: number) => void;
    closeModal: () => void;
}