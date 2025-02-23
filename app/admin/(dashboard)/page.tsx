import AccountRequestList, {
  AccountRequestCard,
} from "@/components/admin/dashboard/AccountRequestList";
import BorrowRequestsList, {
  BorrowRequestCard,
} from "@/components/admin/dashboard/BorrowRequestList";
import { RecentlyAddedBookCard } from "@/components/admin/dashboard/RecentlyAddedList";
import StatCard from "@/components/admin/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import Link from "next/link";

const getDashboardData = async () => {
  const [
    totalUsers,
    totalBooks,
    totalBorrows,
    accountRequests,
    latestBooks,
    latestBorrows,
  ] = await db.$transaction([
    db.user.count(),
    db.book.count(),
    db.borrowRecord.count(),
    db.user.findMany({
      where: {
        status: "PENDING",
      },
      omit: { password: true },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }),
    db.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }),
    db.borrowRecord.findMany({
      include: {
        books: true,
        users: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    }),
  ]);

  return {
    totalBooks,
    totalUsers,
    totalBorrows,
    accountRequests,
    latestBooks,
    latestBorrows,
  };
};

const AdminPage = async () => {
  const {
    totalUsers,
    totalBooks,
    totalBorrows,
    accountRequests,
    latestBooks,
    latestBorrows,
  } = await getDashboardData();
  return (
    <div className="flex flex-col w-full h-full max-h-full p-4 space-y-4 max-w-7xl overflow-auto self-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Borrowed Books" count={totalBorrows} />
        <StatCard title="Total Users" count={totalUsers} />
        <StatCard title="Total Books" count={totalBooks} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full lg:h-[calc(100vh-152px)] overflow-y-clip">
        <div className="space-y-4 flex flex-col lg:flex-1 overflow-y-auto">
          <BorrowRequestsList
            data={latestBorrows as BorrowRecords[]}
            className="lg:max-h-[49%] overflow-y-clip"
          />
          <AccountRequestList
            data={accountRequests as UserData[]}
            className="lg:max-h-[49%] overflow-y-clip"
          />
        </div>
        {/* <Skeleton className="flex-1 rounded-xl" /> */}
        <div className="stat lg:h-full overflow-y-auto">
          <div className="stat-info">
            <h2 className="font-semibold text-lg text-gray-700">
              Recently Added Books
            </h2>
            <Button className="view-btn" asChild>
              <Link href="/admin/books">View All</Link>
            </Button>
          </div>

          <div className="stat-list">
            {latestBooks.map((book) => (
              <RecentlyAddedBookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
