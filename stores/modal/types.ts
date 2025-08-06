export interface HistoryModalState {
    open: boolean;
    selectedId: number | null;
    openModal: (id: number) => void;
    closeModal: () => void;
}

export interface PolicyState {
    hasAccepted: boolean;
    manualOpen: boolean;
    accept: () => void;
    open: () => void;
    close: () => void;
}