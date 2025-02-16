import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const BookCard = ({
  id,
  title,
  genre,
  // rating,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title" title={title}>
            {title}
          </p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar/svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-light-100">11 days to return</p>
            </div>

            <Button className="book-btn">Download Receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

BookCard.Skeleton = function BookCardSkeleton() {
  return (
    <li className="h-[311px]">
      <Skeleton className="book-cover_regular" />
      <div className="mt-4 xs:max-w-40 max-w-28">
        <Skeleton className="book-title-skeleton h-5 w-[80%]" />
        <Skeleton className="book-genre-skeleton h-4 w-[50%] mt-2" />
      </div>
    </li>
  );
};

export default BookCard;