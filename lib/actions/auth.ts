"use server";

import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";

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
    // Check if useralready exist
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
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
