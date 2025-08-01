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

type QuoteEntry = {
    id: string;
    quote: string;
    createdAt: string;
};

type DayGroupedQuotes = {
    date: string;
    entries: QuoteEntry[];
};

interface QuoteHistorySidebarProps {
    onSelect?: (entry: QuoteEntry) => void;
}

export function HistorySidebar({ onSelect }: QuoteHistorySidebarProps) {
    const { isAuthenticated } = useAuthStore();

    const [groupedQuotes, setGroupedQuotes] = useState<DayGroupedQuotes[]>([]);
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

                const quotes: QuoteEntry[] = res.data ?? [];

                // Group by date
                const grouped: Record<string, QuoteEntry[]> = {};

                quotes.forEach((quote) => {
                    const dateKey = format(new Date(quote.createdAt), "yyyy-MM-dd");
                    grouped[dateKey] = grouped[dateKey] || [];
                    grouped[dateKey].push(quote);
                });

                // Format grouped data
                const groupedArray: DayGroupedQuotes[] = Object.entries(grouped)
                    .map(([date, entries]) => ({
                        date,
                        entries: entries.sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        ),
                    }))
                    .sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                    );

                setGroupedQuotes(groupedArray);
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
                                        {group.entries.map((entry) => (
                                            <Button
                                                key={entry.id}
                                                variant="ghost"
                                                className="justify-start text-left text-sm w-full px-2 py-2 rounded hover:bg-accent hover:text-accent-foreground transition"
                                                onClick={() => onSelect?.(entry)}
                                            >
                                                <span className="mr-2 text-muted-foreground">🕓</span>
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {format(new Date(entry.createdAt), "hh:mm a")}
                                                </span>
                                                <span className="mx-2 text-muted-foreground">–</span>
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
