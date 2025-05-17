// components/charts/bar-chart-wrapper.tsx (✅ Server Component)
import { auth } from "@/auth";
import { getCashFlowSummaryByUser } from "@/db/transactions";

import { BarChartTransaction } from "./bar-chart-transaction";

// <- client component

export default async function BarChartWrapper() {
  const session = await auth();

  if (!session?.user) return null;

  const chartData = await getCashFlowSummaryByUser(
    parseInt(session.user.user_id)
  );

  return <BarChartTransaction data={chartData} />;
}
