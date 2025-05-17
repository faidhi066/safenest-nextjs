// /actions/login.ts
"use server";

import bcrypt from "bcryptjs";
// or `bcrypt` if using native
import { z } from "zod";

import { db } from "@/lib/prisma";
// or wherever your Prisma client is
import { SignInSchema } from "@/schemas/zod.schema";

// /actions/login.ts

// /actions/login.ts

export async function login(values: z.infer<typeof SignInSchema>) {
  const { email, password } = values;

  // Find user in the DB
  const user = await db.user_logins.findUnique({
    where: { email },
  });

  if (!user) {
    return { errorEmail: "No account found with this email" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    return { errorPassword: "Incorrect password" };
  }

  // (Optional) Set session / JWT / cookies here if needed

  return {
    success: "Login successful",
    userId: user.email, // or whatever you want to return
  };
}
