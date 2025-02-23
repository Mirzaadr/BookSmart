import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="flex flex-col w-full h-full p-4 space-y-4 max-w-7xl self-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="rounded-xl flex-1 h-[120px]" />
        <Skeleton className="rounded-xl flex-1 h-[120px]" />
        <Skeleton className="rounded-xl flex-1 h-[120px]" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 max-h-full">
        <div className="space-y-4 flex flex-col max-h-full overflow-y-hidden">
          <Skeleton className="rounded-xl flex-1 max-h-[50%]" />
          <Skeleton className="rounded-xl flex-1 max-h-[50%]" />
        </div>
        <Skeleton className="rounded-xl flex-1" />
      </div>
    </div>
  );
};

export default LoadingPage;
