"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";

export const createBook = async (params: BookParams) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }

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

export const deleteBook = async (params: { id: string }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
  try {
    const deletedBook = await db.book.delete({
      where: { id: params.id },
    });

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      success: false,
      error: "An error occured while Deleting the book",
    };
  }
};
export const updateBook = async (params: BookParams & { id: string }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
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
