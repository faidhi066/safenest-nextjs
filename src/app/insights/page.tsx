import { auth } from "@/auth";
import { DebtsClientPage } from "@/components/debts/debts-clients-page";
// create this
import { fetchUserInsightsFromApi } from "@/lib/fetch-insights";

export default async function DebtsPage() {
  const session = await auth();

  if (!session?.user) return null;
  const userId = parseInt(session.user.user_id);
  const insights = await fetchUserInsightsFromApi(
    parseInt(session.user.user_id)
  );

  return <DebtsClientPage initialInsights={insights} userId={userId} />;
}
