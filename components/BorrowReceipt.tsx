import { cn } from "@/lib/utils";
import Image from "next/image";

interface BorrowReceiptProps extends BorrowRecords {
  contentRef?: React.Ref<HTMLDivElement>;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}

const BorrowReceipt = ({
  id,
  borrowDate,
  dueDate,
  books,
  contentRef,
  className,
}: BorrowReceiptProps) => {
  return (
    <div
      id="book-ticket"
      className={cn(
        "block rounded-lg h-[1200px] border border-light-100/10 font-ibm-plex-sans",
        className
      )}
      ref={contentRef}
    >
      <div className="flex flex-row items-center gap-2 pb-10 px-10">
        <Image src={"/icons/logo.svg"} alt="logo" height={37} width={37} />

        <h1 className="text-2xl font-semibold text-white">BookWise</h1>
      </div>
      <div className="px-10 border-b border-light-100/10 pb-8">
        <h2 className="text-2xl font-semibold text-white font-ibm-plex-sans">
          Borrow Receipt
        </h2>
        <div className="mt-3 text-light-100 text-base space-y-1">
          <p className="font-ibm-plex-sans">
            Receipt ID:{" "}
            <span className="font-semibold text-light-200">#{id}</span>
          </p>
          <p className="font-ibm-plex-sans">
            Date Issued:{" "}
            <span className="font-semibold text-light-200">
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(borrowDate)}
            </span>
          </p>
        </div>
      </div>

      <div className="pt-12 px-10 border-b border-light-100/10 pb-9">
        <h3 className="text-lg font-semibold text-white">Book Details</h3>
        <div id="book-details" className="mt-4 grid grid-cols-2 gap-5">
          <div>
            <p>Title</p>
            <p>{books?.title}</p>
          </div>
          <div>
            <p>Author</p>
            <p>{books?.author}</p>
          </div>
          <div>
            <p>Category</p>
            <p>{books?.genre}</p>
          </div>
          <div>
            <p>Borrowed On</p>
            <p>
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(borrowDate)}
            </p>
          </div>
          <div>
            <p>Due Date</p>
            <p>
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(dueDate)}
            </p>
          </div>
          <div>
            <p>Duration</p>
            <p>{30} Days</p>
          </div>
        </div>
      </div>

      <div id="book-divider" className="w-full">
        <div className="z-10" />
        {/* <div className="w-full h-[1px] bg-white"></div> */}
        <div className="z-10" />
      </div>

      <div className="pt-12 px-10 pb-10">
        <h3 className="text-lg font-semibold text-white">Terms</h3>
        <div className="space-y-1 text-sm">
          <p className="text-light-100">
            • The book must be returned within the stipulated time frame.
          </p>
          <p className="text-light-100">
            • A fine of $0.50 will be charged for each day the book is overdue.
          </p>
          <p className="text-light-100">
            • The book must be returned in the same condition as it was
            borrowed.
          </p>
        </div>
      </div>

      <div className="pt-12 px-10 pb-10">
        <p className="text-light-100 font-semibold text-wrap">
          Thank you for choosing{" "}
          <span className="text-light-200">BookWise</span>. We hope you enjoy
          your reading experience.
        </p>
      </div>
    </div>
  );
};

export default BorrowReceipt;
