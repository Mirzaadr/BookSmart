import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

const LoadingSingleBookPage = () => {
  return (
    <>
      <BookOverview.Skeleton />

      <div className="book-details">
        <div className="flex-[1.5]">
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
      </div>
    </>
  );
};

export default LoadingSingleBookPage;
