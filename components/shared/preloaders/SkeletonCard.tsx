import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex justify-center p-4 sm:p-5">
      <div className="flex flex-col space-y-4 w-full max-w-[500px]">
        <Skeleton className="w-full aspect-[5/4] rounded-xl" />
        <div className="space-y-5">
          <div className="flex justify-center">
            <Skeleton className="h-5 w-3/4 sm:w-[350px]" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-5 w-full sm:w-[400px]" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-10 w-full sm:w-[400px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
