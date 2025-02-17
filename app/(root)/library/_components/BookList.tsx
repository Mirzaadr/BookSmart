import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

const BookList = async ({
  query,
  orderBy,
  page = 1,
  pageSize = 12,
}: {
  page?: number;
  query?: Prisma.BookWhereInput;
  orderBy?:
    | Prisma.BookOrderByWithRelationInput
    | Prisma.BookOrderByWithRelationInput[];
  pageSize?: number;
}) => {
  const books = await db.book.findMany({
    where: query,
    orderBy,
    take: pageSize,
    skip: pageSize * (page - 1),
  });

  if (books.length === 0) {
    return (
      <ul className="book-list justify-center items-center min-h-[331px] md:min-h-[662px]">
        <li id="not-found">
          <h4>No Results found</h4>
          <p>
            We couldn&apos;t find anybooks matching your search.
            <br />
            Try using different keywords or titles
          </p>
          <Button
            onClick={async () => {
              "use server";
              redirect("/library");
            }}
            className="not-found-btn"
          >
            Clear Search
          </Button>
        </li>
      </ul>
    );
  }

  return (
    <ul className="book-list justify-center md:justify-start">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </ul>
  );
};

BookList.Skeleton = function BookListSkeleton({ pageSize = 12 }) {
  return (
    <ul className="book-list justify-center md:justify-start">
      {[...Array(pageSize).keys()].map((i) => (
        <BookCard.Skeleton key={i} />
      ))}
    </ul>
  );
};

export default BookList;
