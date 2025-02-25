"use client";
import BorrowReceipt from "@/components/BorrowReceipt";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (
  elementToPrintId: string,
  documentName?: string
) => {
  const element = document.getElementById(elementToPrintId);
  if (!element) {
    throw new Error(`Element with id ${elementToPrintId} not found`);
  }
  const canvas = await html2canvas(element, {
    scale: 2,
    onclone(document, element) {
      element.classList.remove("hidden");
    },
  });

  const data = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    // orientation: "portrait",
    unit: "px",
    format: [544, 1295],
  });
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${documentName || "print"}.pdf`);
};

const GenerateReceiptButton = ({
  children,
  borrowRecord,
}: {
  children: React.ReactNode;
  borrowRecord: BorrowRecords;
}) => {
  return (
    <>
      <span
        onClick={(e) => {
          e.preventDefault();
          generatePDF(`book-receipt-${borrowRecord.id}`, borrowRecord.id);
        }}
      >
        {children}
      </span>
      <div id={`book-receipt-${borrowRecord.id}`} className="hidden">
        <BorrowReceipt {...borrowRecord} className="h-[1295px]" />
      </div>
    </>
  );
};

export default GenerateReceiptButton;
