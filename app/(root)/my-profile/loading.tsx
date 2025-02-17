import BookList from "@/components/BookList";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="w-full lg:w-[40%]">
        <Skeleton className="h-96" />
      </div>
      <div className="w-full lg:w-[60%]">
        <BookList.Skeleton />
      </div>
    </div>
  );
};

export default LoadingPage;
