import BookOverview from "@/components/BookOverview"
import BookVideo from "@/components/BookVideo";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import BookList from "../../library/_components/BookList";
import Markdown from "react-markdown";
import { Suspense } from "react";

const SingleBookPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const { id } = await params;
  if (id.length < 32) return notFound();
  // const [bookDetails] = await db.select().from(books).where(eq(books.id, id)).limit(1);
  const bookDetails = await db.book.findUnique({ where: { id } });

  if (!bookDetails) return notFound();
  return (
    <>
      <BookOverview
        {...bookDetails}
        userId={session.user.id as string}
        fullDescription
      />

      <div className="book-details">
        <div className="flex-1">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>

            <Markdown className="space-y-5 text-xl text-light-100">
              {bookDetails.summary}
            </Markdown>
          </section>
        </div>
        <div className="flex-1">
          <h3>More Books</h3>

          <Suspense fallback={<BookList.Skeleton pageSize={6} />}>
            <BookList
              query={{
                OR: [
                  { author: bookDetails.author },
                  { genre: bookDetails.genre },
                ],
                NOT: { id },
              }}
              pageSize={6}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SingleBookPage;