import Pagination from "@/app/(root)/library/_components/Pagination";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import SortOption from "./_components/SortOption";
import SearchInput from "./_components/SearchInput";
import { Suspense } from "react";
import BookList from "./_components/BookList";
import { Button } from "@/components/ui/button";

const LibraryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  const { page, search, sortBy } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const searchString = search
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");
  const query: Prisma.BookWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString, mode: "insensitive" } },
          { author: { search: searchString, mode: "insensitive" } },
          { genre: { search: searchString, mode: "insensitive" } },
        ],
      }
    : {};
  let orderBy:
    | Prisma.BookOrderByWithRelationInput
    | Prisma.BookOrderByWithRelationInput[]
    | undefined = { title: "asc" };

  if (sortBy) {
    switch (sortBy) {
      case "oldest":
        orderBy = [{ createdAt: "asc" }, { title: "asc" }];
        break;
      case "newest":
        orderBy = [{ createdAt: "desc" }, { title: "asc" }];
        break;
      case "available":
        orderBy = [{ availableCopies: "desc" }, { title: "asc" }];
        break;
      case "rating":
        orderBy = [{ rating: "desc" }, { title: "asc" }];
        break;
      default:
        break;
    }
  }

  const count = await db.book.count({ where: query });

  return (
    <>
      <section className="lg:h-[30vh] justify-center items-center flex">
        <div className="w-full md:w-[500px] lg:w-[700px] flex flex-col justify-center items-center">
          <span className="font-ibm-plex-sans font-semibold capitalize text-light-100 hidden md:block md:text-lg lg:text-xl">
            DISCOVER YOUR NEXT GREAT READ
          </span>
          <h1 className="hidden md:block md:text-4xl lg:text-6xl font-semibold text-light-400 text-wrap text-center mt-3">
            Explore and Search for
            <br /> <span className="text-primary">Any Book</span> In Our Library
          </h1>

          <SearchInput search={search || ""} />
        </div>
      </section>
      <section className="mt-10 md:mt-28">
        <div className="flex w-full items-center justify-between">
          <h2 className="font-bebas-neue text-4xl text-light-100">
            Search Results
          </h2>

          <SortOption defaultValue={sortBy || ""} />
        </div>

        <Suspense
          key={`${page}${sortBy}${search}`}
          fallback={<BookList.Skeleton />}
        >
          <BookList
            page={p}
            query={query}
            orderBy={orderBy}
            emptyPage={
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
            }
          />
        </Suspense>
        <Pagination page={p} count={count} />
      </section>
    </>
  );
};

export default LibraryPage;
