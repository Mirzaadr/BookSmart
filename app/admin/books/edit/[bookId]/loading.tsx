import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <Skeleton className="h-9 w-[103px] mb-10" />

      <section className="w-full max-w-2xl">
        <div className="space-y-8">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-14 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-14 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
