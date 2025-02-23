import BookCover from "@/components/BookCover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { CalendarDays, Eye } from "lucide-react";
import Link from "next/link";

const BorrowRequestsList = ({
  data,
  className,
}: {
  data: BorrowRecords[];
  className: HTMLDivElement["className"];
}) => {
  return (
    <div className={cn("stat", className)}>
      <div className="stat-info">
        <h2 className="font-semibold text-lg text-gray-700">Borrow Requests</h2>
        <Button className="view-btn" asChild>
          <Link href="/admin/borrow-requests">View All</Link>
        </Button>
      </div>

      <div className="stat-list">
        {data.map((borrow) => (
          <BorrowRequestCard
            key={borrow.id}
            borrowData={borrow as BorrowRecords}
          />
        ))}
      </div>
    </div>
  );
};
export const BorrowRequestCard = ({
  borrowData,
}: {
  borrowData: BorrowRecords;
}) => {
  return (
    <div className="book-stripe">
      <BookCover
        coverImage={borrowData.books?.coverUrl || ""}
        coverColor={borrowData.books?.coverColor || ""}
        variant="small"
      />
      <div className="flex flex-col flex-1">
        <h3 className="title">{borrowData.books?.title}</h3>
        <div className="author">
          <p>By {borrowData.books?.author}</p>
          <div />
          <p>{borrowData.books?.genre}</p>
        </div>
        <div className="user">
          <div className="avatar">
            <Avatar className="size-6">
              <AvatarFallback className="bg-blue-100 text-[0.6rem] text-white">
                {getInitials(borrowData.users?.fullName || "IN")}
              </AvatarFallback>
            </Avatar>
            <p>{borrowData.users?.fullName}</p>
          </div>
          <div className="borrow-date">
            <CalendarDays className="size-4 text-light-500" />
            <p>
              {new Intl.DateTimeFormat("en-US").format(borrowData.borrowDate)}
            </p>
          </div>
        </div>
      </div>
      <Button
        className="bg-white size-6 hover:bg-white/80 hover:shadow-sm text-primary-admin"
        size="icon"
      >
        <Eye />
      </Button>
      {/* <Button className="reject-btn">Reject</Button> */}
    </div>
  );
};

export default BorrowRequestsList;
