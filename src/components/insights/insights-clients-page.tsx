"use client";

import { useState } from "react";

import { RefreshCw } from "lucide-react";

import { RootInsights } from "@/schemas/insights.schema";
import {
  NewRootInsights,
  NewRootInsightsSchema,
} from "@/schemas/new-insights.schema";

import { DebtInsightsCard } from "../debts/debt-insights-card";
import { SiteHeader } from "../home/site-header";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface InsightClientPageProps {
  initialInsights: RootInsights;
  userId: number;
}
export function InsightsClientPage({
  initialInsights,
  userId,
}: InsightClientPageProps) {
  const [newInsights, setNewInsights] = useState<NewRootInsights | undefined>();
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const regenerateInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://safenest-api.onrender.com/users/${userId}/insights/financial_report`,
        {
          method: "POST",
        }
      );
      console.log("Response status:", response.status);

      if (!response.ok) throw new Error("Failed to regenerate");

      const rawData = await response.json();
      const parsed = NewRootInsightsSchema.safeParse(rawData);

      if (!parsed.success) {
        console.error("Schema validation failed", parsed.error.format());
        alert("Unexpected response format");
        return;
      }

      setNewInsights(parsed.data); // parsed.data is guaranteed to be RootInsights
    } catch (err) {
      console.error(err);
      setFailed(true); // ✅ mark failure state

      // alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SiteHeader
        title="Insights"
        navItems={["Short Horizon", "Long Horizon"]}
      />
      <h1 className="p-4 lg:px-6">
        Your spending at a glance. Track your prioritites, spending breakdown,
        and monitor your overall financial health.
      </h1>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="grid grid-cols-1 gap-6 px-6 py-4 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-primary mb-4 text-xl font-semibold">
                    Debt Analysis
                  </h2>
                  <DebtInsightsCard
                    insights={initialInsights}
                    debtOrSavings="debt"
                  />
                </div>

                <div>
                  <h2 className="text-primary mb-4 text-xl font-semibold">
                    Saving Analysis
                  </h2>
                  <DebtInsightsCard
                    insights={initialInsights}
                    debtOrSavings="savings"
                  />
                </div>
              </div>

              <aside className="border-l pl-4">
                <Button
                  className="mb-4 w-full"
                  onClick={regenerateInsights}
                  disabled={loading}
                >
                  {loading
                    ? "Regenerating..."
                    : failed
                      ? "Failed. Try again?"
                      : "Regenerate Insights"}
                  <RefreshCw
                    className={`ml-2 h-4 w-4 ${loading && "animate-spin"}`}
                  />
                </Button>

                <h2 className="text-primary mb-4 text-xl font-semibold">
                  Priorities
                </h2>

                <div className="flex flex-col gap-4">
                  <Card className="@container/card">
                    <CardHeader className="relative">
                      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Debt Consolidation
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                      <div className="line-clamp-1 flex gap-2 font-medium">
                        Recommended actions:
                      </div>
                      <div className="text-muted-foreground">
                        <p>
                          {newInsights
                            ? newInsights.debt_insights.insights[0]
                                .recommended_actions
                            : initialInsights.insights.debt_insights.insights[0]?.recommended_actions
                                .split("\n")
                                .map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                    <br />
                                  </span>
                                ))}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>

                  <Card className="@container/card">
                    <CardHeader className="relative">
                      <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        Savings Rate
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex-col items-start gap-1 text-sm">
                      <div className="line-clamp-1 flex gap-2 font-medium">
                        Recommended actions:
                      </div>
                      <div className="text-muted-foreground">
                        <p>
                          {newInsights
                            ? newInsights.savings_insights.insights[0]
                                .recommended_actions
                            : initialInsights.insights.savings_insights.insights[0]?.recommended_actions
                                .split("\n")
                                .map((line, index) => (
                                  <span key={index}>
                                    {line}
                                    <br />
                                    <br />
                                  </span>
                                ))}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
