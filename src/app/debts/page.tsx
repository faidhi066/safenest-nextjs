import { InsightsCard } from "@/components/debts/insights-card";
import { SiteHeader } from "@/components/home/site-header";
import { SectionCardsInsights } from "@/components/insights/section-cards";
import { fetchUserInsightsFromApi } from "@/lib/fetch-insights";

export default async function DebtsPage() {
  const insights = await fetchUserInsightsFromApi();
  return (
    <>
      <SiteHeader
        title="Debts"
        navItems={[
          "Dashboard",
          "Smart Analysis",
          "Payoff Planner",
          "All Debts",
        ]}
      />
      <h1 className="p-4 lg:px-6">
        Let our algorithm do the lifting - it analyses your commitments, detects
        risks, and highlights opportunities that drives you towards your goals.
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCardsInsights
              title="Summary"
              content={insights.insights.debt_insights.summary}
            />
            {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
            <div className="grid grid-cols-1 gap-6 px-6 py-4 lg:grid-cols-[2fr_1fr]">
              {/* Left Side (Main Content) */}
              <div className="space-y-6">
                {/* Section: Debt Analysis */}
                <div>
                  <h2 className="text-primary mb-2 text-xl font-semibold">
                    Debt Analysis
                  </h2>
                  <InsightsCard insights={insights} debtOrSavings="debt" />
                </div>

                {/* Section: Economic Analysis */}
                <div>
                  <h2 className="text-primary mb-2 text-xl font-semibold">
                    Saving Analysis
                  </h2>
                  <InsightsCard insights={insights} debtOrSavings="savings" />
                </div>
              </div>

              {/* Right Side (Sidebar) */}
              <aside className="border-l pl-4">
                <h2 className="text-primary mb-2 text-xl font-semibold">
                  My Priorities
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold">Feb 2025</h3>
                    <p className="text-muted-foreground text-sm">
                      0/0 achieved
                    </p>
                    <p className="text-muted-foreground italic">
                      – No priorities yet –
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold">Jan 2025</h3>
                    <p className="text-muted-foreground text-sm">
                      2/3 achieved
                    </p>
                    <div className="mt-2 rounded-md border bg-orange-50 p-3">
                      <h4 className="font-semibold">Underutilisation</h4>
                      <p className="text-muted-foreground text-sm">
                        Lorem Ipsum is simply dummy text...
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
