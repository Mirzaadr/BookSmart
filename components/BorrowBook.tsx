"use client"
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { borrowBook } from "@/lib/actions/book";

interface BorrowBookProps {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  }
}

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: {
    isEligible,
    message,
  },
}: BorrowBookProps) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully",
        });

        router.push("/");
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      });
    } finally {
      setBorrowing(false);
    }
  }
  return (
    <Button className="book-overview_btn" onClick={handleBorrowBook} disabled={borrowing}>
      <Image src="/icons/book.svg" alt="book" width={22} height={22}/>
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing" : "Borrow Book"}
      </p>
    </Button>
  )
}

export default BorrowBook;