"use client";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { APIResponse } from "@/types/responses";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { Loader2 } from "lucide-react";
import { AuthModal } from "@/components/shared/modals/AuthModal";
import useAuthStore from "@/stores/auth/useAuthStore";
import { QuoteRecord, RecordGroupedByDay } from "@/types/shared";

interface QuoteHistorySidebarProps {
    onSelect?: (entry: QuoteRecord) => void;
}

export function HistorySidebar({ onSelect }: QuoteHistorySidebarProps) {
    const { isAuthenticated } = useAuthStore();

    const [groupedQuotes, setGroupedQuotes] = useState<RecordGroupedByDay[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchQuoteHistory = async () => {
            setLoading(true);
            setError(null);

            try {
                const res: APIResponse = await apiRequest({
                    method: "GET",
                    url: "/quotify",
                });

                const grouped = res.data as RecordGroupedByDay[];
                setGroupedQuotes(grouped ?? []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to fetch quote history"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuoteHistory();
    }, [isAuthenticated]);

    return (
        <Sidebar>
            <SidebarHeader className="sticky top-0 z-10 border-b px-6 py-4">
                <h4 className="text-md font-semibold tracking-tight">
                    {isAuthenticated ? "My Quotifies" : "Not Logged In"}
                </h4>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto px-2 py-4">
                {loading ? (
                    <div className="flex items-center justify-center h-24">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">
                            Loading...
                        </span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-24">
                        <span className="text-destructive text-sm">{error}</span>
                    </div>
                ) : !isAuthenticated ? (
                    <AuthModal />
                ) : groupedQuotes.length === 0 ? (
                    <div className="flex items-center justify-center h-24">
                        <span className="text-muted-foreground text-sm">
                            No quotes yet.
                        </span>
                    </div>
                ) : (
                    <Accordion type="multiple" className="w-full space-y-2">
                        {groupedQuotes.map((group) => (
                            <AccordionItem
                                key={group.date}
                                value={group.date}
                                className="border-b last:border-b-0"
                            >
                                <AccordionTrigger className="px-2 py-2 rounded hover:bg-muted/50 transition">
                                    {format(new Date(group.date), "MMMM do, yyyy")}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-1">
                                        {group.record.map((entry) => (
                                            <Button
                                                key={entry.id}
                                                variant="ghost"
                                                className="justify-start text-left text-sm w-full px-2 py-2 rounded hover:bg-accent hover:text-accent-foreground transition"
                                                onClick={() => {
                                                    if (onSelect) onSelect(entry);
                                                }}
                                            >
                                                <span className="mr-2 text-muted-foreground">🕓</span>
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {format(new Date(entry.dateCreated), "hh:mm a")}
                                                </span>
                                                <span className="text-muted-foreground">-</span>
                                                <span className="truncate">
                                                    {entry.quote.slice(0, 40)}...
                                                </span>
                                            </Button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </SidebarContent>
        </Sidebar>
    );
}
