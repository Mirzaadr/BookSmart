import DataTable from "@/components/admin/DataTable";
import { columns } from "@/components/admin/columns/AccountRequestsColumns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

const AccountRequestPage = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7  flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">
            Account Registration Requests
          </h2>
        </div>

        <div className="mt-7 w-full overflow-hidden">
          <DataTable
            columns={columns}
            fetchData={async (page, pageSize) => {
              "use server";
              const session = await auth();
              if (!session || !session.user?.id) {
                throw new Error("Unathorized User");
              }
              const query: Prisma.UserWhereInput = {
                NOT: { id: session.user?.id },
              };
              const [data, total] = await db.$transaction([
                db.user.findMany({
                  where: { NOT: { id: session.user?.id } },
                  take: pageSize,
                  skip: page * pageSize,
                  orderBy: { createdAt: "desc" },
                }),
                db.user.count({ where: query }),
              ]);

              return { data: data as UserData[], total };
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default AccountRequestPage;
