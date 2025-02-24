import { Button } from "@/components/ui/button";
import Link from "next/link";

import { columns } from "@/components/admin/columns/BookColumns";
import DataTable from "@/components/admin/DataTable";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const BooksPage = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">All Books</h2>
          <Button
            className="bg-primary-admin hover:bg-primary-admin/70"
            asChild
          >
            <Link href="/admin/books/new" className="text-white">
              + Create a new book
            </Link>
          </Button>
        </div>

        <div className="mt-7 w-full overflow-hidden">
          <DataTable
            columns={columns}
            fetchData={async (page, pageSize) => {
              "use server";
              const query: Prisma.BookWhereInput = {};
              const [data, total] = await db.$transaction([
                db.book.findMany({
                  where: query,
                  take: pageSize,
                  skip: page * pageSize,
                }),
                db.book.count({ where: query }),
              ]);

              return { data, total };
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BooksPage;