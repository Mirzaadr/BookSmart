"use server";
import { db } from "@/lib/prisma";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = new Date(
      new Date().setDate(new Date().getDate() + 7)
    ).toString();

    const record = await db.borrowRecord.create({
      data: {
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      },
    });

    await db.book.update({
      where: { id: bookId },
      data: {
        availableCopies: book.availableCopies - 1,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.error(JSON.stringify(error));
    return {
      success: false,
      error: "Error borrowing book, try again later",
    };
  }
};
