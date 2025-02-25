import BorrowReceipt from "@/components/BorrowReceipt";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GenerateReceiptButton from "@/components/GenerateReceiptButton";

const ReceiptPage = async ({
  params,
}: {
  params: Promise<{ receiptId: string }>;
}) => {
  const { receiptId } = await params;

  const borrowRecord = await db.borrowRecord.findUnique({
    include: {
      books: true,
    },
    where: {
      id: receiptId,
    },
  });
  if (!borrowRecord) {
    return notFound();
  }
  return (
    <div className="w-full items-center flex flex-col">
      <BorrowReceipt {...borrowRecord} className="mt-10" />
      <GenerateReceiptButton borrowRecord={borrowRecord}>
        <Button className="w-[544px] mt-5">Download</Button>
      </GenerateReceiptButton>
    </div>
  );
};

export default ReceiptPage;
