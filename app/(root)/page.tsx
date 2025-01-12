import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

const RootPage = async () => {
  const session = await auth();

  if (!session?.user) redirect('/sign-in');

  const latestBooks = await db.select().from(books).limit(10).orderBy(desc(books.createdAt)) as Book[];
  return (
    <>
      <BookOverview 
        {...latestBooks[0]}
        userId={session?.user.id as string}
      />

      <BookList 
        title="Latest Books"
        books={latestBooks}
        containerClassname="mt-28"
      />
    </>
  )
}

export default RootPage;