"use client";
import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import useHistoryModalStore from "@/stores/modal/useHistoryModalStore";
import { UseGetHistory } from "../hooks/generators";
import { useCallback, useEffect, useState } from "react";
import { HistorySkeleton } from "../preloaders/HistorySkeleton";
import { HistoryResponse } from "@/types/responses";
import ImageComparisonSlider from "@/components/shared/ComparisonSlider";
import { Button } from "@/components/ui/button";
import { Download, Clipboard, Share2, AlertTriangle } from "lucide-react";
import {
    copyToClipBoard,
    downloadImage,
    shareUsingShareAPI,
    toastFailure,
} from "@/lib/generic";
import { format } from "date-fns";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function HistoryModal() {
    const { open, selectedId, closeModal } = useHistoryModalStore();
    const { history: getHistory, isLoading } = UseGetHistory();
    const [error, setError] = useState<Error | null>(null);
    const [result, setResult] = useState<HistoryResponse | null>(null);
    const [downloadingOriginal, setDownloadingOriginal] = useState(false);
    const [downloadingGenerated, setDownloadingGenerated] = useState(false);

    const publicImageUrl = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "").replace(/\/$/, "");
    const isWebShareAvailable = typeof navigator !== "undefined" && !!navigator.share;

    const handleModalClose = () => {
        closeModal();
        setResult(null);
        setError(null);
    };

    const handleLoadHistory = useCallback(() => {
        if (!selectedId) return;
        setError(null);
        setResult(null);

        getHistory(selectedId)
            .then((res) => setResult(res as HistoryResponse))
            .catch((err) => {
                console.error(err);
                setError(err instanceof Error ? err : new Error("Failed to load record"));
            });
    }, [getHistory, selectedId]);

    const handleDownload = async (image: string, isOriginal: boolean) => {
        try {
            if (isOriginal) {
                setDownloadingOriginal(true)
            } else {
                setDownloadingGenerated(true)
            }
            await downloadImage(image);
        } catch (err) {
            toastFailure("Failed to download image");
            console.error(err);
        } finally {
            if (isOriginal) {
                setDownloadingOriginal(false)
            } else {
                setDownloadingGenerated(false)
            }
        }
    };

    const handleShare = () => {
        if (!result?.imageURL) return;
        shareUsingShareAPI({
            title: "Quoti-Fy",
            text: result.quote,
            url: `${publicImageUrl}/${result.imageURL.generated}`,
        });
    };

    useEffect(() => {
        if (open && selectedId != null) {
            handleLoadHistory();
        }
    }, [open, selectedId, handleLoadHistory]);

    const isBusy = isLoading;

    return (
        <Dialog open={open} onOpenChange={handleModalClose}>
            <DialogContent
                className="sm:max-w-[650px] space-y-4"
                onInteractOutside={(e) => e.preventDefault()}
                showCloseButton={!isBusy}
            >
                {isBusy ? (
                    <>
                        <DialogTitle className="sr-only">Loading Record</DialogTitle>
                        <HistorySkeleton />
                    </>
                ) : error ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>That was unexpected</DialogTitle>
                        </DialogHeader>
                        <Alert variant="destructive" className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>
                                {error.message || "Could not load this record."}
                            </AlertTitle>
                        </Alert>
                    </>
                ) : result ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Quotify Record</DialogTitle>
                            {result.quote && (
                                <blockquote className="mt-2 text-sm font-medium italic text-center text-gray-800 dark:text-gray-200 break-words">
                                    “{result.quote}”
                                </blockquote>
                            )}
                            <DialogDescription className="text-xs text-muted-foreground text-center">
                                {format(new Date(result.dateCreated), "PPpp")}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-4">
                            {/* Image comparison */}
                            {result.imageURL && (
                                <ImageComparisonSlider
                                    before={`${publicImageUrl}/${result.imageURL.generated}`}
                                    after={`${publicImageUrl}/${result.imageURL.original}`}
                                />
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-2 justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => copyToClipBoard(result.quote)}
                                    className="w-full text-xs flex items-center gap-2"
                                >
                                    <Clipboard size={14} />
                                    Copy Quote
                                </Button>

                                {isWebShareAvailable && (
                                    <Button
                                        variant="outline"
                                        onClick={handleShare}
                                        className="w-full text-xs flex items-center gap-2"
                                    >
                                        <Share2 size={14} />
                                        Share Quote
                                    </Button>
                                )}
                            </div>

                            {/* Download buttons */}
                            {result.imageURL && (
                                <div className="flex gap-2 w-full">
                                    <Button
                                        onClick={() =>
                                            handleDownload(`${publicImageUrl}/${result.imageURL.original}`, true)
                                        }
                                        disabled={downloadingOriginal}
                                        className="flex-1 px-4 py-2 text-sm font-medium rounded-full bg-[#A6B1E1] text-[#1F1B2E] hover:bg-[#C3C8F5] active:scale-95 flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        {downloadingOriginal ? "Downloading..." : "Original"}
                                    </Button>

                                    <Button
                                        onClick={() =>
                                            handleDownload(`${publicImageUrl}/${result.imageURL.generated}`, false)
                                        }
                                        disabled={downloadingGenerated}
                                        className="flex-1 px-4 py-2 text-sm font-medium rounded-full bg-[#1F1B2E] text-white hover:bg-[#3A3650] active:scale-95 flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        {downloadingGenerated ? "Downloading..." : "Generated"}
                                    </Button>
                                </div>
                            )}

                            {/* Extra Prompt Data */}
                            {result.promptData && (
                                <div className="rounded-md border p-3 text-xs text-muted-foreground bg-muted/30">
                                    <p><strong>Mood:</strong> {result.promptData.mood}</p>
                                    <p><strong>Style:</strong> {result.promptData.moodImageStyle}</p>
                                    <p><strong>Filter:</strong> {result.promptData.moodFilter}</p>
                                    <p><strong>Mood Range:</strong> {result.promptData.moodRange}%</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <DialogHeader>
                        <DialogTitle>No Record Found</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Could not retrieve details for this record.
                        </DialogDescription>
                    </DialogHeader>
                )}
            </DialogContent>
        </Dialog>
    );
}
