import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex h-[450px] justify-center p-5">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[400px] w-[500px] rounded-xl" />
        <div className="space-y-5">
          <div className="flex justify-center">
            <Skeleton className="h-5 w-[350px]" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-10 w-[400px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
