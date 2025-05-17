import { db } from "@/lib/prisma";

const userId = parseInt(process.env.USER_ID as string);

export async function getUserProfileById() {
  const userProfile = await db.users.findFirst({
    where: { user_id: userId },
  });
  return userProfile;
}
