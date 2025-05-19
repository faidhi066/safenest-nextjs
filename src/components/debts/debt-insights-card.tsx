import { CheckCircleIcon, StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RootInsights } from "@/schemas/insights.schema";

import { Button } from "../ui/button";

const priorityStyles = {
  urgent: "border-red-600 bg-red-50 text-red-800",
  opportunity: "border-green-600 bg-green-50 text-green-800",
  important: "border-yellow-300 bg-yellow-50 text-yellow-800",
  improvement: "border-orange-500 bg-orange-50 text-orange-800",
};
type Priority = keyof typeof priorityStyles;

export function DebtInsightsCard({
  insights,
  debtOrSavings,
}: {
  insights: RootInsights;
  debtOrSavings: "debt" | "savings";
}) {
  const selectedInsights =
    debtOrSavings === "debt"
      ? insights.insights.debt_insights
      : insights.insights.savings_insights;
  return Array.from(
    {
      length: Math.ceil(selectedInsights.insights.length / 2),
    },
    (_, index) => {
      const first = selectedInsights.insights[index * 2];
      const second = selectedInsights.insights[index * 2 + 1];

      return (
        <div
          key={index}
          className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card text-gree text-green grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2"
        >
          {[first, second].filter(Boolean).map((insight, nestedIndex) => {
            const priorityKey = insight.priority.toLowerCase() as Priority;
            const priorityClass = priorityStyles[priorityKey] ?? "bg-muted";
            return (
              <Card
                key={index + nestedIndex}
                className={`${priorityClass} @container/card border-l-8`}
              >
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                      {insight.insight_title}
                    </CardTitle>

                    {insight.priority && (
                      <Badge
                        className={`${priorityClass} font-medium capitalize`}
                      >
                        {insight.priority}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="text-muted-foreground line-clamp-4">
                    <p>{insight.detailed_insight}</p>
                  </div>

                  {/* Dialog with detailed content */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-sm text-blue-600 hover:underline">
                        Read more
                      </button>
                    </DialogTrigger>

                    <DialogContent className="max-w-2xl">
                      <DialogTitle className="text-2xl font-semibold">
                        {insight.insight_title}
                      </DialogTitle>
                      <DialogHeader>
                        {/* Title + badge side by side */}
                        <div className="flex items-center justify-between">
                          {/* <h2 className="text-xl font-semibold"></h2> */}
                          <Badge className={`border ${priorityClass}`}>
                            {insight.priority}
                          </Badge>
                        </div>

                        {/* Action buttons: Review and Edit */}
                        <div className="mt-2 flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <CheckCircleIcon className="h-4 w-4" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1">
                            <StarIcon className="h-4 w-4" />
                            Follow
                          </Button>
                        </div>
                      </DialogHeader>

                      <div className="text-muted-foreground space-y-3 pt-2 text-sm">
                        <p>{insight.detailed_insight}</p>

                        <div>
                          <h4 className="mb-1 font-semibold underline">
                            Implications
                          </h4>
                          <ul className="list-disc space-y-1 pl-4">
                            {insight.implications
                              .split("\n")
                              .map((implication, i) => (
                                <li key={i}>{implication} </li>
                              ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-1 font-semibold underline">
                            Recommended Actions
                          </h4>
                          <ul className="list-disc space-y-1 pl-4">
                            {insight.recommended_actions
                              .split("\n")
                              .map((action, i) => (
                                <li key={i}>{action}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      );
    }
  );
}
