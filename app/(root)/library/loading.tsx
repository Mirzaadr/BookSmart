import { Skeleton } from "@/components/ui/skeleton";
import BookList from "./_components/BookList";

const LoadingLibraryPage = () => {
  return (
    <>
      <section className="lg:h-[30vh] justify-center items-center flex">
        <div className="w-full md:w-[500px] lg:w-[700px] flex flex-col justify-center items-center">
          <Skeleton className="w-[362px] h-7" />
          <div className="flex flex-col gap-2 w-full items-center mt-3">
            <Skeleton className="w-[95%] h-14" />
            <Skeleton className="w-full h-14" />
          </div>

          <Skeleton className="w-full h-14 mt-10" />
        </div>
      </section>
      <section className="mt-10 md:mt-28">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="w-40 h-10" />

          <Skeleton className="w-40 h-10" />
        </div>

        <BookList.Skeleton />
        <div className="flex items-center justify-end mt-4">
          <Skeleton className="h-12 w-1/2" />
        </div>
      </section>
    </>
  );
};

export default LoadingLibraryPage;
