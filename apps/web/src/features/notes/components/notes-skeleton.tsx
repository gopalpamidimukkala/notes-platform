import { Skeleton } from "@/components/ui/skeleton";

export function NotesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div
          key={index}
          className="space-y-3 rounded-2xl border border-border/50 p-5"
        >
          <Skeleton className="h-6 w-2/3" />

          <Skeleton className="h-4 w-full" />

          <Skeleton className="h-4 w-5/6" />

          <Skeleton className="h-4 w-4/6" />
        </div>
      ))}
    </div>
  );
}
