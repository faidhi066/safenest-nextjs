import { db } from "@/lib/prisma";
import { FullInsights, FullInsightsSchema } from "@/schemas/insights.schema";

// const userId = parseInt(process.env.USER_ID as string);

export async function getUserInsightsById(
  userId: number
): Promise<FullInsights> {
  const record = await db.users_insights.findFirst({
    where: { user_id: userId },
    orderBy: { updated_at: "desc" },
  });

  console.log("Fetched insights record:", record?.insights);
  const parsed = FullInsightsSchema.safeParse(record?.insights);
  console.log("Parsed insights:", parsed);

  if (!parsed.success) {
    throw new Error(`Invalid RootInsights format for user_id ${userId}`);
  }

  return parsed.data;
}
