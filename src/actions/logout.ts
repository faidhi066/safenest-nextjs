"use server";

import { AuthError } from "next-auth";

import { signOut } from "@/auth";

export const logout = async () => {
  console.log("Logging Out ACTIONS -----");
  // console.log(values);
  // console.log(validatedFields);
  try {
    await signOut();
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log(error);
          return {
            errorEmail: "Invalid credentials",
            errorPassword: "Invalid credentials",
          };
        default:
          return {
            errorEmail: "Something went wrong!",
            errorPassword: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
