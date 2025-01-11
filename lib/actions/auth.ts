"use server";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  return { success: true, error: false };
};

export const signUp = async (params: AuthCredentials) => {
  return { success: true, error: false };
};
