"use server";

import { db } from "@/lib/prisma";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db.book.create({
      data: {
        ...params,
        availableCopies: params.totalCopies,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook)),
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      success: false,
      error: "An error occured while creating the book",
    };
  }
};

export const updateBook = async (params: BookParams & { id: string }) => {
  try {
    const updatedBook = await db.book.update({
      where: { id: params.id },
      data: {
        ...params,
        availableCopies: params.totalCopies,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook)),
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      success: false,
      error: "An error occured while Updating the book",
    };
  }
};
