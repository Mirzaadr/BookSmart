import BookList from "@/components/BookList";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ProfileCard from "./_components/ProfileCard";

const ProfilePage = async () => {
  const session = await auth();
  if (!session || !session.user?.id) {
    return redirect("/sign-in");
  }

  const borrowedBooks: BorrowedBook[] = (
    await db.borrowRecord.findMany({
      where: {
        userId: session.user.id,
        // status: "BORROWED",
      },
      include: {
        books: true,
      },
    })
  ).map((borrowedBook) => ({
    ...borrowedBook.books,
    receiptId: borrowedBook.id,
    isLoanedBook: true,
    dueDate: borrowedBook.dueDate,
    borrowDate: borrowedBook.borrowDate,
  }));
  return (
    <div className="flex flex-col lg:flex-row gap-14">
      <div className="w-full lg:w-[40%]">
        <ProfileCard userId={session.user.id} />
      </div>
      <div className="w-full lg:w-[60%]">
        <BookList title="Borrowed Books" books={borrowedBooks} />
      </div>
    </div>
  );
};

export default ProfilePage;
