import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

const RootPage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  // const latestBooks = await db.select().from(books).limit(10).orderBy(desc(books.createdAt)) as Book[];
  const latestBooks = (await db.book.findMany({
    take: 10,
    orderBy: { createdAt: "asc" },
  })) as Book[];
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks}
        containerClassname="mt-28"
      />
    </>
  );
};

export default RootPage;