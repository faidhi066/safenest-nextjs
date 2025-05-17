// components/charts/bar-chart-wrapper.tsx (✅ Server Component)
import { getCashFlowSummaryByUser } from "@/db/transactions";

import { BarChartTransaction } from "./bar-chart-transaction";

// <- client component

export default async function BarChartWrapper() {
  const chartData = await getCashFlowSummaryByUser();

  return <BarChartTransaction data={chartData} />;
}
