"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/prisma";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.error(error, "Sign in error");
    return { success: false, error: "Unable to sign in" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityCard, universityId } = params;

  try {
    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (!!existingUser) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        universityId,
        universityCard,
      },
    });

    await signInWithCredentials({
      email,
      password,
    });

    return { success: true };
  } catch (error) {
    console.error(error, "Signup error");
    return { success: false, error: "Sign up error, unable to insert data" };
  }
};
