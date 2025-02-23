import BackButton from "@/components/admin/BackButton";
import BookCover from "@/components/BookCover";
import BookVideo from "@/components/BookVideo";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { CalendarDaysIcon, PencilLineIcon, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const SingleBookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;
  const book = await db.book.findUnique({
    where: { id: bookId },
  });

  if (!book) return notFound();

  const {
    title,
    author,
    genre,
    coverUrl,
    coverColor,
    createdAt,
    description,
    videoUrl,
    summary,
  } = book;
  const colorCover = coverColor; //"#C43";

  const renderStar = () => {
    const rating = parseInt(book.rating.toFixed(0));

    return (
      <span className="flex space-x-1">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className="size-4"
              stroke="gray"
              {...(index + 1 <= rating && { fill: "#FFD700" })}
            />
          ))}
      </span>
    );
  };
  return (
    <>
      <BackButton />

      <div className="w-full max-w-7xl flex-wrap overflow-hidden admin">
        {/* <span className="">SingleBookPage</span> */}
        {/* <pre>{JSON.stringify(book, null, 4)}</pre> */}
        <section className="w-full flex flex-col md:flex-row space-y-5 md:space-x-5 md:space-y-0 max-w-4xl">
          <div
            className={cn(
              "w-full md:aspect-[5/4] md:w-[350px] p-7 rounded-lg items-center justify-center flex"
              // `bg-[${colorCover}]/40`
            )}
            // style={{ backgroundColor: "rgba(201, 76, 76, 0.3)" }}
            style={{ backgroundColor: colorCover + "4D" }}
          >
            <BookCover
              variant="regular"
              className="z-10"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between px-1 py-3 md:px-4 md:py-4">
            <div className="flex flex-col space-y-4 mb-4">
              <div className="flex w-full text-light-500 gap-2 text-sm">
                Created at:{" "}
                <span className="gap-1 flex items-center">
                  <CalendarDaysIcon className="size-4" />
                  {new Intl.DateTimeFormat("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(createdAt!)}
                </span>
              </div>
              <div className="flex flex-col space-y-[2px]">
                <p className="w-full text-2xl text-dark-100 font-semibold">
                  {title}
                </p>
                <p className="w-full text-light-500 text-lg font-semibold">
                  By {author}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {renderStar()} <span>{book.rating}</span>
              </div>
              <p className="w-full text-light-500 text-sm">{genre}</p>
            </div>

            <Button
              className="bg-primary-admin hover:bg-primary-admin/95 text-white md:min-h-14 md:text-sm md:[&_svg]:size-6"
              // size="sm"
              asChild
            >
              <Link href={`/admin/books/edit/${bookId}`}>
                <PencilLineIcon />
                Edit Book
              </Link>
            </Button>
          </div>
        </section>

        <div className="mt-16 flex flex-col lg:flex-row gap-16">
          <section className="flex flex-col gap-7 flex-[1.5]">
            <h3 className="text-xl font-semibold">Summary</h3>
            {summary && (
              <Markdown className="text-slate-500">{summary}</Markdown>
            )}
          </section>

          <section className="flex flex-col gap-7 max-w-4xl flex-1">
            <h3 className="text-xl font-semibold">Video</h3>
            <BookVideo videoUrl={videoUrl} />
          </section>
        </div>

        <div className="mt-16 flex flex-col gap-7">
          <h3 className="text-xl font-semibold">Description</h3>
          {description && (
            <Markdown className="text-slate-500">{description}</Markdown>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleBookPage;
