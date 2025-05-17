import { db } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = db.user_logins.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};
