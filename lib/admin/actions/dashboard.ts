"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

export const getDashboardData = async () => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
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
      take: 8,
    }),
    db.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    }),
    db.borrowRecord.findMany({
      include: {
        books: true,
        users: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
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
