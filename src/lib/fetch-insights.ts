// lib/fetch-insights.ts
import { RootInsights, RootInsightsSchema } from "@/schemas/insights.schema";

// const userId = parseInt(process.env.USER_ID as string);

export async function fetchUserInsightsFromApi(
  userId: number
): Promise<RootInsights> {
  const res = await fetch(
    `https://safenest-api.onrender.com/users/${userId}/insights/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Optional auth if needed:
        // Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      next: { revalidate: 86400 }, // 24 hours
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch insights: ${res.statusText}`);
  }

  const data = await res.json();
  console.log("DATA", data);
  const parsed = RootInsightsSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data structure received from API");
  }

  return parsed.data;
}
