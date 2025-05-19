import { auth } from "@/auth";
import { InsightsClientPage } from "@/components/insights/insights-clients-page";
// create this
import { fetchUserInsightsFromApi } from "@/lib/fetch-insights";

export default async function InsightsPage() {
  const session = await auth();

  if (!session?.user) return null;
  const userId = parseInt(session.user.user_id);
  const insights = await fetchUserInsightsFromApi(
    parseInt(session.user.user_id)
  );

  return <InsightsClientPage initialInsights={insights} userId={userId} />;
}
