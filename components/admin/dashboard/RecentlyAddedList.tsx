import BookCover from "@/components/BookCover";
import { Button } from "@/components/ui/button";
import { CalendarDays, PlusIcon } from "lucide-react";
import Link from "next/link";

const RecentlyAddedList = ({ books }: { books: Book[] }) => {
  return (
    <div className="stat">
      <div className="stat-info">
        <h2 className="font-semibold text-lg text-gray-700">
          Recently Added Books
        </h2>
        <Button className="view-btn" asChild>
          <Link href="/admin/books">View All</Link>
        </Button>
      </div>
      {/* Recently added books content */}
      <Link
        href="/admin/books/new"
        className="group add-new-book_btn w-full hover:bg-light-400 transition-colors duration-200"
      >
        <div className="group-hover:bg-slate-200 transition-colors duration-200">
          <PlusIcon />
        </div>
        <p>Add New Book</p>
      </Link>
      <div className="flex flex-col gap-4 max-h-full overflow-auto">
        {books.map((book) => (
          <RecentlyAddedBookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export const RecentlyAddedBookCard = ({ book }: { book: Book }) => {
  return (
    <div className="book-stripe">
      <BookCover
        coverImage={book.coverUrl}
        coverColor={book.coverColor}
        variant="small"
      />
      <div className="flex flex-col flex-1">
        <h3 className="title">{book.title}</h3>
        <div className="author">
          <p>By {book.author}</p>
          <div />
          <p>{book.genre}</p>
        </div>
        <div className="user">
          {book.createdAt && (
            <div className="borrow-date">
              <CalendarDays className="size-4 text-light-500" />
              <p>{new Intl.DateTimeFormat("en-US").format(book.createdAt)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAddedList;
