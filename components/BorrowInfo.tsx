"use client";

import { calculateDueDays } from "@/lib/utils";
import { BookOpenTextIcon, Calendar, ReceiptText } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BorrowInfo = ({
  receiptId,
  borrowDate,
  dueDate,
}: {
  receiptId: string;
  borrowDate: Date;
  dueDate: Date;
}) => {
  const dueDays = calculateDueDays(dueDate);
  const router = useRouter();
  return (
    <>
      <div className="mt-3 w-full flex justify-between">
        <div className="book-loaned">
          <BookOpenTextIcon size={18} className="text-primary" />
          <p className="text-light-100">
            Borrowed on{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(borrowDate)}
          </p>
        </div>
      </div>
      <div className="mt-2 w-full flex justify-between">
        <div className="book-loaned">
          <Calendar size={18} className="text-primary" />
          <p className="text-light-100">
            {dueDays > 0
              ? `${dueDays} days to return`
              : `Overdue by ${Math.abs(dueDays)} days`}
          </p>
        </div>

        <Button
          className="book-btn"
          size={"icon"}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Receipt clicked");
            router.push(`/receipt/${receiptId}`);
          }}
        >
          <ReceiptText />
        </Button>
      </div>
    </>
  );
};

export default BorrowInfo;
