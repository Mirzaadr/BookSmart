"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const approveUser = async (params: { id: string }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
  try {
    const approvedUser = await db.user.update({
      where: { id: params.id },
      data: {
        status: "APPROVED",
      },
    });

    return {
      success: true,
      data: approvedUser,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      success: false,
      error: "An error occured while approving the user",
    };
  }
};

export const rejectUser = async (params: { id: string }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
  try {
    const rejectedUser = await db.user.update({
      where: { id: params.id },
      data: {
        status: "REJECTED",
      },
    });

    return {
      success: true,
      data: rejectedUser,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      success: false,
      error: "An error occured while rejecting the user",
    };
  }
};

export const changeRole = async (params: { id: string; role: Role }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
  try {
    const updatedUser = await db.user.update({
      where: { id: params.id },
      data: {
        role: params.role,
      },
    });

    return {
      success: true,
      data: updatedUser,
    };
  } catch (error) {
    console.error(JSON.stringify(error));

    return {
      success: false,
      error: "An error occured while changing the role",
    };
  }
};

export const deleteUser = async (params: { id: string }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "ADMIN") {
    throw new Error("You are unauthorized to do this");
  }
  try {
    await db.user.delete({
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
      error: "An error occured while Deleting the user",
    };
  }
};
