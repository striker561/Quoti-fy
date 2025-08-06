import { Skeleton } from "@/components/ui/skeleton";

export function HistorySkeleton() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-4 w-full">
                <Skeleton className="w-full aspect-[6/4] rounded-xl bg-[#A6B1E1]" />
                <div className="space-y-5">
                    <div className="flex justify-center">
                        <Skeleton className="h-7 w-full bg-[#A6B1E1]" />
                    </div>
                    <div className="flex justify-center gap-2">
                        <Skeleton className="h-5 w-[50%] bg-[#A6B1E1]" />
                        <Skeleton className="h-5 w-[50%] bg-[#A6B1E1]" />
                    </div>
                    <div className="flex justify-center">
                        <Skeleton className="h-15 w-full bg-[#A6B1E1]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
