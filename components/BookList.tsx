import { cn } from "@/lib/utils";
import BookCard from "./BookCard";

interface BookListProps {
  title: string;
  books: Book[];
  containerClassname?: string;
}

const BookList = ({
  title,
  books,
  containerClassname,
}: BookListProps) => {
  if (books.length < 2) return;
  
  return (
    <section className={cn(
      "",
      containerClassname,
    )}>

      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>

      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} {...book}/>
        ))}
      </ul>
    </section>
  )
}

export default BookList;