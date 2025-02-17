import BookOverview from "@/components/BookOverview";
import { Skeleton } from "@/components/ui/skeleton";
import BookList from "../../library/_components/BookList";

const LoadingSingleBookPage = () => {
  return (
    <>
      <BookOverview.Skeleton />

      <div className="book-details">
        <div className="flex-1">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <Skeleton className="h-[300px]" />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              <Skeleton className="h-[500px]" />
            </div>
          </section>
        </div>
        <div className="flex-1">
          <h3>More Books</h3>
          <BookList.Skeleton pageSize={6} />
        </div>
      </div>
    </>
  );
};

export default LoadingSingleBookPage;
