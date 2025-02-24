import DataTable from "@/components/admin/DataTable";
import { columns } from "@/components/admin/columns/BorrowRecordsColumns";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const BorrowRecordsPage = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7 flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Borrow Book Requests</h2>
        </div>

        <div className="mt-7 w-full overflow-hidden">
          <DataTable
            columns={columns}
            fetchData={async (page, pageSize) => {
              "use server";
              const query: Prisma.BorrowRecordWhereInput = {};
              const [data, total] = await db.$transaction([
                db.borrowRecord.findMany({
                  include: { users: true, books: true },
                  take: pageSize,
                  skip: page * pageSize,
                  orderBy: {
                    borrowDate: "desc",
                  },
                }),
                db.borrowRecord.count({ where: query }),
              ]);
              return { data: data as BorrowRecords[], total };
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default BorrowRecordsPage;
