import { QuoteRecord, RecordGroupedByDay } from "@/types/shared";

export interface HistoryState {
    history: RecordGroupedByDay[],
    setHistory: (data: RecordGroupedByDay[]) => void,
    addHistory: (data: QuoteRecord) => void,
    removeHistory: (id: number) => void,
    clear: () => void,
}