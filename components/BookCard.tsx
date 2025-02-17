import Link from "next/link";
import BookCover from "./BookCover";
import { cn, calculateDueDays } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { BookOpenTextIcon, Calendar, ReceiptText } from "lucide-react";

const BookCard = ({
  id,
  title,
  genre,
  // rating,
  coverColor,
  coverUrl,
  borrowDate,
  dueDate,
  isLoanedBook = false,
}: Book & BorrowedBook) => {
  return (
    <li className={cn(isLoanedBook && "borrowed-book")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <div
          className={cn("", isLoanedBook && "borrowed-book_cover")}
          style={isLoanedBook ? { backgroundColor: coverColor + "4D" } : {}}
        >
          <BookCover
            coverColor={coverColor}
            coverImage={coverUrl}
            variant={isLoanedBook ? "medium" : "regular"}
          />
        </div>

        <div
          className={cn("mt-4 w-full", !isLoanedBook && "xs:max-w-40 max-w-28")}
        >
          <p className="book-title" title={title}>
            {title}
          </p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && borrowDate && dueDate && (
          <BorrowInfo borrowDate={borrowDate} dueDate={dueDate} />
        )}
      </Link>
    </li>
  );
};

const BorrowInfo = ({
  borrowDate,
  dueDate,
}: {
  borrowDate: Date;
  dueDate: Date;
}) => {
  const dueDays = calculateDueDays(dueDate);
  return (
    <>
      <div className="mt-3 w-full flex justify-between">
        <div className="book-loaned">
          <BookOpenTextIcon size={18} className="text-primary" />
          <p className="text-light-100">
            Borrowed on{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(borrowDate)}
          </p>
        </div>
      </div>
      <div className="mt-2 w-full flex justify-between">
        <div className="book-loaned">
          <Calendar size={18} className="text-primary" />
          <p className="text-light-100">
            {dueDays > 0
              ? `${dueDays} days to return`
              : `Overdue by ${Math.abs(dueDays)} days`}
          </p>
        </div>

        <Button className="book-btn" size={"icon"}>
          <ReceiptText />
        </Button>
      </div>
    </>
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