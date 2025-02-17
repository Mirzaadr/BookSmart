import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/lib/prisma";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import Markdown from "./Markdown";

const BookOverview = async ({
  id,
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
  fullDescription,
}: Book & { userId: string; fullDescription?: boolean }) => {
  // const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const user = await db.user.findUnique({ where: { id: userId } });

  const borrowingEligibilty = {
    isEligible: availableCopies > 0 && user?.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info max-w-full overflow-auto">
          <p className="text-wrap">
            By{" "}
            <span className="font-semibold text-light-200 max-w-[250px] truncate text-wrap">
              {author}
            </span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        {fullDescription ? (
          // <p className="book-description text-wrap max-w-[625px]">
          //   {description}
          // </p>
          <Markdown className="book-description text-wrap max-w-[625px]">
            {description}
          </Markdown>
        ) : (
          <p className="book-description text-wrap">
            {description.slice(0, 315)}
            {description.length > 315 && "... "}
            {description.length > 315 && (
              <span className="text-xl text-primary-500 cursor-pointer w-[150px] text-right hover:underline text-blue-100">
                <Link href={`/books/${id}`}>Read More</Link>
              </span>
            )}
          </p>
        )}
        {/* <ReadMore>{description}</ReadMore> */}

        {!user && (
          <BorrowBook
            bookId={id.toString()}
            userId={userId}
            borrowingEligibility={borrowingEligibilty}
          />
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

BookOverview.Skeleton = function BookOverviewSkeleton() {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <Skeleton className="h-8 w-4/5" />

        <div className="book-info">
          <Skeleton className="h-5 w-[30%]" />
          <Skeleton className="h-5 w-[25%]" />

          <Skeleton className="h-[22px] w-[22px] rounded-full" />
        </div>

        <div className="book-copies">
          <Skeleton className="h-5 w-[25%]" />
          <Skeleton className="h-5 w-[30%]" />
        </div>
        <Skeleton className="h-[130px] w-full mt-2" />
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <Skeleton className="book-cover_wide z-10" />
        </div>
      </div>
    </section>
  );
};

export default BookOverview;