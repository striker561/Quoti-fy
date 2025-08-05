"use client"
import { Dialog, DialogDescription, DialogHeader, DialogContent, DialogTitle } from "@/components/ui/dialog"
import useHistoryModalStore from "@/stores/modal/useHistoryModalStore";
import { UseGetHistory } from "../hooks/generators";
import { useCallback, useEffect, useState } from "react";
import { HistorySkeleton } from "../preloaders/HistorySkeleton";

export default function HistoryModal() {
    const { open, selectedId, closeModal } = useHistoryModalStore();
    const { history: getHistory, isLoading } = UseGetHistory()
    const [error, setError] = useState<Error | null>(null)
    const [result, setResult] = useState<unknown | null>(null)

    // --- Handlers ---
    const handleModalClose = () => {
        closeModal();
        setResult(null);
        setError(null);
    };
    
    const handleLoadHistory = useCallback(() => {
        setError(null);
        console.log(selectedId)
        getHistory(selectedId as number).then(setResult).catch((err) => {
            console.error(err);
            setError(err);
        });
    }, [getHistory, selectedId])

    useEffect(() => {
        if (!open || selectedId == null) return;
        handleLoadHistory();
    }, [handleLoadHistory, open, selectedId])

    const isBusy = isLoading;

    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                showCloseButton={!isBusy}
            >
                {isBusy ? (
                    <>
                        {/* --- Loading State --- */}
                        <DialogTitle className="sr-only">Getting Record</DialogTitle>
                        <HistorySkeleton />
                    </>
                ) : (
                    <>
                        {/* --- Main State --- */}
                        <DialogHeader>
                            <DialogTitle>Modal Record</DialogTitle>
                            <DialogDescription>
                                Showing details for record ID: {selectedId}
                            </DialogDescription>
                        </DialogHeader>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}