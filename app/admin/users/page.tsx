import DataTable from "@/components/admin/DataTable";
import { columns } from "@/components/admin/columns/UsersColumns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const UserListPage = () => {
  return (
    <section className="w-full rounded-2xl bg-white p-7 flex justify-center">
      <div className="max-w-7xl w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">All Users</h2>
          {/* <Button className="bg-primary-admin" asChild>
        <Link href="/admin/books/new" className="text-white">
          + Create a new book
        </Link>
      </Button> */}
        </div>

        <div className="mt-7 w-full overflow-hidden">
          <DataTable
            columns={columns}
            // data={data}
            // totalData={totalData}
            onDeleteRow={async (id) => {
              "use server";

              if (!id) return;
              try {
                await db.user.delete({ where: { id } });
                revalidatePath("/admin/users");
              } catch (error) {
                console.error(error);
              }
            }}
            fetchData={async (page, pageSize) => {
              "use server";
              const session = await auth();
              if (!session || !session.user?.id) {
                throw new Error("Unathorized User");
              }

              const query: Prisma.UserWhereInput = {
                NOT: { id: session.user?.id },
                status: "APPROVED",
              };
              const [data, total] = await db.$transaction([
                db.user.findMany({
                  where: query,
                  include: { borrowRecords: true },
                  take: pageSize,
                  skip: page * pageSize,
                }),
                db.user.count({ where: query }),
              ]);

              return { data: data as UserData[], total };
            }}
          />
          {/* <DataTableSkeleton /> */}
        </div>
      </div>
    </section>
  );
};

export default UserListPage;
