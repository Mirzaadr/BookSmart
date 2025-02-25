import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <Skeleton className="h-9 w-[103px] mb-10" />

      <div className="w-full max-w-7xl flex-wrap overflow-hidden admin">
        <section className="w-full flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0 max-w-4xl">
          <Skeleton className="w-full md:aspect-[5/4] md:w-[350px] p-7 rounded-lg items-center justify-center flex" />
          <div className="flex-1 flex flex-col justify-between px-1 py-3 md:px-4 md:py-4">
            <div className="flex flex-col space-y-4 mb-4">
              <Skeleton className="h-5 w-[60%]" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-7 w-[70%]" />
                <Skeleton className="h-6 w-[50%]" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="flex space-x-1">
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="size-4 rounded-full" />
                  <Skeleton className="size-4 rounded-full" />
                </span>
                <Skeleton className="h-4 w-10" />
              </div>
              <Skeleton className="h-5 w-[20%]" />
            </div>

            <Skeleton className="h-14 w-full" />
          </div>
        </section>

        <div className="mt-16 flex flex-col lg:flex-row gap-16">
          <section className="flex flex-col gap-7 flex-[1.5]">
            <Skeleton className="h-7 w-[40%]" />
            <Skeleton className="h-[260px] w-full mt-2" />
          </section>

          <section className="flex flex-col gap-7 max-w-4xl flex-1">
            <Skeleton className="h-7 w-[40%]" />
            <Skeleton className="aspect-video w-full" />
          </section>
        </div>

        <div className="mt-16 flex flex-col gap-7">
          <Skeleton className="h-7 w-[20%]" />
          <Skeleton className="h-[320px] w-full mt-2" />
        </div>
      </div>
    </>
  );
};

export default Loading;
