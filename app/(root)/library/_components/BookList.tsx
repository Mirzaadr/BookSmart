import BookCard from "@/components/BookCard";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const BookList = async ({
  query,
  orderBy,
  page = 1,
  pageSize = 12,
  emptyPage,
}: {
  page?: number;
  query?: Prisma.BookWhereInput;
  orderBy?:
    | Prisma.BookOrderByWithRelationInput
    | Prisma.BookOrderByWithRelationInput[];
  pageSize?: number;
  emptyPage?: React.ReactNode;
}) => {
  const books = await db.book.findMany({
    where: query,
    orderBy,
    take: pageSize,
    skip: pageSize * (page - 1),
  });

  if (books.length === 0) {
    return !!emptyPage ? (
      emptyPage
    ) : (
      <ul className="book-list justify-center items-center">
        <li id="not-found">
          <h4>No Results found</h4>
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
