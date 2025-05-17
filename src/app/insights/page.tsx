import { DebtsClientPage } from "@/components/debts/debts-clients-page";
// create this
import { fetchUserInsightsFromApi } from "@/lib/fetch-insights";

export default async function DebtsPage() {
  const insights = await fetchUserInsightsFromApi();

  return <DebtsClientPage initialInsights={insights} />;
}
