"use client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import { APIResponse } from "@/types/responses";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuAction,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, ChevronUp, Loader2, Quote, Trash, User2 } from "lucide-react";
import { AuthModal } from "@/components/shared/modals/AuthModal";
import useAuthStore from "@/stores/auth/useAuthStore";
import { RecordGroupedByDay } from "@/types/shared";
import useHistoryModalStore from "@/stores/modal/useHistoryModalStore";
import { toastFailure, toastSuccess } from "@/lib/generic";
import useHistoryStore from "@/stores/records/useHistoryStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function HistorySidebar() {
    const { isAuthenticated, user, } = useAuthStore();
    const { history, setHistory, removeHistory } = useHistoryStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});


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
                setHistory(grouped ?? []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to fetch quote history"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchQuoteHistory();
    }, [isAuthenticated, setHistory]);


    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this quote?")) return;
        try {
            await apiRequest({
                method: "DELETE",
                url: `/quotify`,
                data: {
                    id: id
                }
            });
            removeHistory(id);
            toastSuccess("Record deleted");
        } catch (err) {
            console.error(err);
            toastFailure("Failed to delete record");
        }
    };

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
                ) : history.length === 0 ? (
                    <div className="flex items-center justify-center h-24">
                        <span className="text-muted-foreground text-sm">
                            No quotes yet.
                        </span>
                    </div>
                ) : (
                    <>
                        {history.map((group) => {
                            const isOpen = openGroups[group.date] ?? false;
                            return (
                                <SidebarGroup key={group.date}>
                                    <Collapsible
                                        open={isOpen}
                                        onOpenChange={(open) =>
                                            setOpenGroups((prev) => ({ ...prev, [group.date]: open }))
                                        }
                                        className="w-full"
                                    >
                                        <CollapsibleTrigger asChild>
                                            <div className="flex items-center justify-between px-2 py-2 cursor-pointer hover:bg-muted/50 rounded transition">
                                                <span className="text-sm font-medium">
                                                    {format(new Date(group.date), "MMMM do, yyyy")}
                                                </span>
                                                {isOpen ? (
                                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenu>
                                                {group.record.map((entry) => (
                                                    <SidebarMenuItem key={entry.id}>
                                                        <SidebarMenuButton
                                                            asChild
                                                            onClick={() =>
                                                                useHistoryModalStore.getState().openModal(entry.id)
                                                            }
                                                            className="justify-start truncate text-left"
                                                        >
                                                            <button>
                                                                <Quote className="h-4 w-4 text-muted-foreground" />
                                                                <span className="font-mono text-xs text-muted-foreground">
                                                                    {format(new Date(entry.dateCreated), "hh:mm a")}
                                                                </span>
                                                                <span className="text-muted-foreground">-</span>
                                                                <span className="truncate">{entry.quote.slice(0, 10)}...</span>
                                                            </button>
                                                        </SidebarMenuButton>
                                                        <SidebarMenuAction
                                                            onClick={() => handleDelete(entry.id)}
                                                            title="Delete record"
                                                        >
                                                            <Trash className="h-4 w-4 text-destructive" />
                                                        </SidebarMenuAction>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenu>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </SidebarGroup>
                            );
                        })}
                    </>
                )}
            </SidebarContent>
            {isAuthenticated && (
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 /> {user?.name}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <span>Data Usage</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem variant="destructive">
                                        <span>Delete Quotify Account</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
