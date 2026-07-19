import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <Skeleton className="mt-3.5 h-2.5 w-14 rounded-full" />
      <Skeleton className="mt-2 h-4 w-3/4 rounded-md" />
      <Skeleton className="mt-2 h-3 w-24 rounded-full" />
      <Skeleton className="mt-2.5 h-5 w-20 rounded-md" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, cols = 4 }: { count?: number; cols?: 3 | 4 }) {
  return (
    <div
      className={
        cols === 3
          ? "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3"
          : "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
